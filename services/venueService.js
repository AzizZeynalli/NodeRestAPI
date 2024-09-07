const Venue = require("../models/venueModel");
const redisClient = require("../config/redisClient");

const VENUE_LIST_CACHE_KEY = "venue_list";
const VENUE_CACHE_KEY = "venue";

exports.createVenue = async (venueData) => {
  const newVenue = new Venue(venueData);
  return await newVenue.save();
};

exports.getVenueList = async (query, skip, limit) => {
    const cacheKey = `${VENUE_LIST_CACHE_KEY}_${JSON.stringify(query)}_${skip}_${limit}`;
    console.log(`Cache Key: ${cacheKey}`);
  
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log(`Cache Hit: ${cacheKey}`);
      return JSON.parse(cachedData);
    }
  
    console.log(`Cache Miss: ${cacheKey}`);
    const venues = await Venue.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .exec();
    console.log(`Query Result: ${venues.length} venues`);
  
    const totalVenues = await Venue.countDocuments(query);
    const result = { venues, totalVenues };
  
    await redisClient.set(cacheKey, JSON.stringify(result), 'EX', 3600);
  
    return result;
  };

  

exports.getVenueById = async (id) => {
  const cacheKey = `${VENUE_CACHE_KEY}_${id}`;
  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const venue = await Venue.findById(id);
  if (venue) {
    await redisClient.set(cacheKey, JSON.stringify(venue));
  }

  return venue;
};

exports.updateVenue = async (id, venueData) => {
  const updatedVenue = await Venue.findByIdAndUpdate(id, venueData, {
    new: true,
    runValidators: true,
  });

  if (updatedVenue) {
    await redisClient.del(`${VENUE_CACHE_KEY}_${id}`);
    await redisClient.del(`${VENUE_LIST_CACHE_KEY}_${JSON.stringify({})}_0_10`); // Adjust as necessary
  }

  return updatedVenue;
};

exports.deleteVenue = async (id) => {
  const deletedVenue = await Venue.findByIdAndDelete(id);

  if (deletedVenue) {
    await redisClient.del(`${VENUE_CACHE_KEY}_${id}`);
    await redisClient.del(`${VENUE_LIST_CACHE_KEY}_${JSON.stringify({})}_0_10`); // Adjust as necessary
  }

  return deletedVenue;
};
