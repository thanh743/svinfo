const Device = require('../Model/Device'); 



async function checkAndUpdateDevice(deviceData) {
  const { serial } = deviceData;

  // Find the device by serial
  let device = await Device.findOne({ serial });

  if (device) {
    const currentDate = new Date();
    
    if (device.expiryDate && new Date(device.expiryDate) < currentDate) {
        throw new Error("Device is expired");
    } else {
      return device;
    }
  } else {
    // Device does not exist, create a new one
    const newDevice = new Device(deviceData);
    
    await newDevice.save();
    throw new Error("Device is registered");
  }
}
// Create a new device
async function createDevice(deviceData) {
  const newDevice = new Device(deviceData);
  return await newDevice.save();
}

// Read (get) a device by ID
async function getDeviceById(deviceId) {
  return await Device.findById(deviceId);
}

// Read (get) all devices
async function getAllDevices() {
  return await Device.find();
}

// Update a device by ID
async function updateDevice(deviceId, updateData) {
  return await Device.findByIdAndUpdate(deviceId, updateData, { new: true });
}

// Delete a device by ID
async function deleteDevice(deviceId) {
  return await Device.findByIdAndDelete(deviceId);
}

module.exports = {
  createDevice,
  getDeviceById,
  getAllDevices,
  updateDevice,
  deleteDevice,
  checkAndUpdateDevice
};



// check device exist 
// if device exist => check expired date => isExpired ? ${} : ${data}
      // not exist => create device