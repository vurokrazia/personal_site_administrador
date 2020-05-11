import { uniqBy, findIndex, remove } from "lodash";
export function setStart(state, start) {
  state.start = start;
}
export function setExperience(state, experience) {
  state.experience = experience;
}
export function setEditExperience(state, experience) {
  state.edit_experience = experience;
}
export function setExperiences(state, data) {
  if (state.start === 1) {
    state.experiences = data;
  } else {
    let experiences = state.experiences.concat(data);
    state.experiences = uniqBy(experiences, function(n) {
      return n.id;
    });
  }
}
export function setUpdateExperiences(state, data) {
  var index = findIndex(state.experiences, {
    id: data.id
  });
  state.experiences.splice(index, 1, data);
}
export function removeExperience(state, item) {
  state.experiences = remove(state.experiences, function(n) {
    return n.id != item.id;
  });
}
