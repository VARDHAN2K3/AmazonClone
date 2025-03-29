export const trackDetails = JSON.parse(localStorage.getItem('track-details')) || [];
export function tracking(id,arrivalDay,quantity){
     trackDetails[0] = id;
     trackDetails[1] = arrivalDay;
     trackDetails[2] = quantity;
     localStorage.setItem('track-details',JSON.stringify(trackDetails));
     console.log(trackDetails);
}