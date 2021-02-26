import axios from "axios";

export default {
  saveListing: function(listingData) {
    return axios.post("/api/listing", listingData);
  },
  getUser: function(id) {
    return axios.get("/user", {
      params: {
        id
      }
    });
  },
  getListings: function() {
    return axios.get("/api/listing");
  },
  getListingsForProf: function(user) {
    return axios.get("/api/listing/dash", {
      params: {
        userId: user
      }
    });
  },
  getReservForProf: function(id) {
    // console.log(id);
    return axios.get("/api/listing/reserved/", {
      params: {
        id
      }
    });
  },
  getReservById: function(id) {
    return axios.get("api/listings/reserved", {
      params: {
        id
      }
    });
  },
  getListingById: function(id) {
    return axios.get("api/listing", {
      params: {
        id
      }
    });
  },
  getListingByIdAndProximity: function(data) {
    return axios.get("api/listing/near", {
      params: {
        data
      }
    });
  },
  updateAvailability: function(availabilityData) {
    return axios.put("api/availability", availabilityData);
  },
  createAvailability: function(availabilityData) {
    return axios.post("api/availability", availabilityData);
  },
  deleteAvailability: function(id) {
    return axios.delete(`/api/availability/${id}`);
  },
  getAvailableListings: function(dates) {
    return axios.get("api/availability", {
      params: {
        dates
      }
    });
  },
  editListing: function(listing) {
    return axios.put("api/listing/dash", { listing });
  },
  deleteListing: function(id) {
    return axios.delete("/api/listing/dash/" + id);
  },
  updateAvailabilityInProfile: function(newData) {
    return axios.post("/api/availability/update", newData);
  },
  getAvailabilitiesByListingId: function(id) {
    return axios.get(`/api/availability/${id}`);
  }
};