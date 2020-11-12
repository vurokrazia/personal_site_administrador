<template>
  <div>
    <v-navigation-drawer v-model="model" app temporary>
      <v-toolbar flat>
        <v-list>
          <h1 class="title">Application</h1>
        </v-list>
      </v-toolbar>

      <v-divider></v-divider>
      <v-list>
        <v-list-group v-for="(item, i) in admins" :key="i" :prepend-icon="'dashboard'" no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title link v-text="item.title" />
            </v-list-item-content>
          </template>

          <v-list-item
            link
            v-for="subItem in item.list"
            :key="subItem.title"
            @click="checkNameRoute(subItem)"
            v-text="subItem.title"
          >
            <v-list-item-content>
              <v-list-item-title />
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
      <v-list>
        <v-subheader>{{ $t("labels.home") }}</v-subheader>

        <v-list-item v-for="(item, i) in visit_list" :key="i" @click="checkNameRoute(item)">
          <v-list-item-icon>
            <v-icon>dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar class="primary" app>
      <v-app-bar-nav-icon @click.stop="model = !model" />
      <v-toolbar-title>
        <v-btn class="secondary" @click="checkNameRoute(visit_list[0])">Jesús Martínez</v-btn>
      </v-toolbar-title>
      <v-progress-linear
        :active="display_loading"
        :indeterminate="display_loading"
        absolute
        bottom
        color="secondary accent-4"
      ></v-progress-linear>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text @click="changeTheme">
          <v-icon v-if="!theme_on">wb_sunny</v-icon>
          <v-icon v-else>nights_stay</v-icon>
        </v-btn>
        <v-btn text v-show="logged" @click="logoutStorage">
          <v-icon>exit_to_app</v-icon>
        </v-btn>
        <v-btn
          text
          v-show="!logged"
          v-for="(item, i) in items"
          :key="i"
          @click="checkNameRoute(item)"
        >
          <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";
import mixins from "../../mixins";
export default {
  watch: {
    loading() {
      this.display_loading = this.loading;
    },
    theme_on() {
      this.evalueModeTheme();
    },
    experiences() {
      [];
      //this.createListExperiences();
    },
    skills() {
      [];
      //this.createListSkills();
    },
    user() {
      this.prepare_session();
    }
  },
  mixins: [mixins],
  created() {
    this.prepare_session();
    this.evalueModeTheme();
  },
  data() {
    return {
      logged: false,
      skills: [],
      experiences: [],
      model: false,
      root_name: null,
      admins: [],
      visit_list: [
        {
          title: this.$t("path.home.root.title"),
          to: this.$t("path.home.root.path")
        },
        {
          title: this.$t("path.home.red.title"),
          to: this.$t("path.home.red.path")
        },
        {
          title: this.$t("path.articles.title"),
          to: { name: this.$t("path.articles.index.name") },
          icon: this.$t("path.articles.index.icon")
        },
        {
          title: this.$t("path.categories.index.title"),
          to: { name: this.$t("path.categories.index.name") },
          icon: this.$t("path.categories.index.icon")
        }
      ],
      auth_list: [
        {
          title: this.$t("path.users.register.title"),
          to: { name: this.$t("path.users.register.name") },
          icon: "person_add"
        },
        {
          title: this.$t("path.users.login.title"),
          to: { name: this.$t("path.users.login.name") },
          icon: "person"
        }
      ],
      admin_list: [
        {
          title: this.$t("path.articles.title"),
          list: [
            {
              title: this.$t("path.articles.new.title"),
              to: { name: this.$t("path.articles.new.name") },
              icon: this.$t("path.articles.new.icon")
            },
            {
              title: this.$t("path.articles.index.title"),
              to: { name: this.$t("path.articles.index.name") },
              icon: this.$t("path.articles.index.icon")
            }
          ]
        },
        {
          title: this.$t("path.categories.title"),
          list: [
            {
              title: this.$t("path.categories.new.title"),
              to: { name: this.$t("path.categories.new.name") },
              icon: this.$t("path.categories.new.icon")
            },
            {
              title: this.$t("path.categories.index.title"),
              to: { name: this.$t("path.categories.index.name") },
              icon: this.$t("path.categories.index.icon")
            }
          ]
        }
      ],
      item: null,
      items: [],
      display_loading: false
    };
  },
  methods: {
    ...mapMutations("appModule", ["setTheme_On"]),
    changeTheme() {
      this.setTheme_On(!this.theme_on);
    },
    prepare_session() {
      this.find_loggin();
      this.createMenuItems();
    },
    find_loggin() {
      this.logged = this.user ? this.user.token != null : false;
    },
    evalueModeTheme() {
      this.$vuetify.theme.light = this.theme_on;
      this.$vuetify.theme.dark = !this.theme_on;
    },
    createMenuItems() {
      this.items = [];
      this.admins = [];
      if (this.logged) this.items = this.items.concat(this.visit_list);
      else this.items = this.items.concat(this.auth_list);
      if (this.is_administrator) this.admins = this.admin_list;
    },
    checkNameRoute(root) {
      var item = root.to;
      this.$router.push(item).catch(err => {});
      this.model = false;
    },
    showItem(item, key) {
      var to = this.$t(`path.${key}.show.name`);
      if (key == "experiences") {
        this.setExperience(item);
      } else if (key == "skills") {
        this.setSkill(item);
      }
      if (to != this.$route.name) {
        this.$router.push({ name: to }).catch(err => {});
      }
      //this.model = !this.model;
    },
    createListExperiences() {
      this.display_loading = true;
    },
    createListSkills() {}
  },
  computed: {
    ...mapGetters("authModule", ["user", "is_administrator"]),
    ...mapState("appModule", ["theme_on"])
  }
};
</script>
