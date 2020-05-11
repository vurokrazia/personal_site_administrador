<template>
  <v-row>
    <v-col xs="12" offset-sm="2" sm="8" offset-md="3" md="6">
      <v-card :loading="loading" shaped class="mx-auto pt-5" outlined>
        <v-list-item three-line class="mt-5">
          <v-list-item-avatar tile size="120" color="grey"></v-list-item-avatar>
          <v-list-item-content>
            <div class="overline mb-4">{{ $t("labels.profile") }}</div>
            <v-list-item-title class="headline mb-2" v-if="profile">
              {{
              profile.title
              }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-capitalize" v-if="profile">
              {{
              full_name
              }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-card-text v-if="profile">{{ profile.bibliography }}</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn-toggle v-if="profile" borderless>
            <v-btn :href="profile.site" target="_blank" value="right">
              <v-icon left>mdi-format-align-right</v-icon>
              <span class="hidden-sm-and-down">site</span>
            </v-btn>
            <v-btn :href="profile.twitter" target="_blank" value="right">
              <v-icon left>mdi-format-align-right</v-icon>
              <span class="hidden-sm-and-down">twitter</span>
            </v-btn>
            <v-btn :href="profile.fb" target="_blank" value="right">
              <v-icon left>mdi-format-align-right</v-icon>
              <span class="hidden-sm-and-down">fb</span>
            </v-btn>
            <v-btn :href="profile.linke" target="_blank" value="right">
              <v-icon left>mdi-format-align-right</v-icon>
              <span class="hidden-sm-and-down">linke</span>
            </v-btn>
            <v-btn :href="profile.yt" target="_blank" value="right">
              <v-icon left>mdi-format-align-right</v-icon>
              <span class="hidden-sm-and-down">yt</span>
            </v-btn>
          </v-btn-toggle>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  name: "MeUser",
  watch: {
    loading() {
      this.setLoading(this.loading);
    }
  },
  data() {
    return { loading: false };
  },
  computed: {
    ...mapGetters("profileModule", ["profile"]),
    full_name() {
      return `${this.profile.name} ${this.profile.last_name}`;
    }
  },
  mounted() {
    this.loading = true;
    if (!this.profile) this.findProfile();
    else this.loading = false;
  },
  methods: {
    ...mapMutations("profileModule", ["setProfile"]),
    ...mapMutations("appModule", ["setLoading"]),
    ...mapActions("authModule", ["me"]),
    ...mapMutations("authModule", ["setUser", "setToken"]),
    findProfile() {
      this.me()
        .then(response => {
          let json = response.data;
          this.setProfile(json.profile);
          this.loading = false;
        })
        .catch(err => {
          var error = err.response;
          if (error && error.data) alert(error.data.message);
          else console.log(error.data);
          this.loading = false;
        });
    }
  }
};
</script>
