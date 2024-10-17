export const getData = (data) => {
  return {
    type: "GET_DATA",
    payload: data,
  };
};

export const updateActivities = (data) => {
  return {
    type: "UPDATE_ACTIVITIES",
    payload: data,
  };
};
