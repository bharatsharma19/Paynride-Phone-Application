const initialState = {
  booking: {},
  userDetails: {},
  vehicle: {},
  deliveryLocation: {},
};

export default function RootReducer(state = initialState, actions) {
  switch (actions.type) {
    case 'ADD_BOOKING':
      state.booking = actions.payload;
      return {
        booking: state.booking,
        userDetails: state.userDetails,
        vehicle: state.vehicle,
        deliveryLocation: state.deliveryLocation,
      };

    case 'ADD_USER':
      state.userDetails[actions.payload[0]] = actions.payload[1];
      return {
        userDetails: state.userDetails,
        booking: state.booking,
        vehicle: state.vehicle,
        deliveryLocation: state.deliveryLocation,
      };

    case 'ADD_VEHICLE':
      state.vehicle = actions.payload;
      return {
        vehicle: state.vehicle,
        userDetails: state.userDetails,
        booking: state.booking,
        deliveryLocation: state.deliveryLocation,
      };

    case 'ADD_LOCATION':
      state.deliveryLocation = actions.payload;
      return {
        deliveryLocation: state.deliveryLocation,
        userDetails: state.userDetails,
        booking: state.booking,
        vehicle: state.vehicle,
      };

    default:
      return state;
  }
}
