const express = require('express');
const router = express.Router();
const deviceController = require('../Controller/deviceController'); // Adjust the path as necessary

// Route to create a new device
router.post('/', async (req, res) => {
  try {
    const device = await deviceController.createDevice(req.body);
    res.status(201).json(device);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



// Route to get a device by ID
router.get('/:id', async (req, res) => {
  try {
    const device = await deviceController.getDeviceById(req.params.id);
    if (!device) return res.status(404).json({ message: 'Device not found' });
    res.json(device);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get all devices
router.get('/', async (req, res) => {
  try {
    const devices = await deviceController.getAllDevices();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to update a device by ID
router.put('/:id', async (req, res) => {
  try {
    const device = await deviceController.updateDevice(req.params.id, req.body);
    if (!device) return res.status(404).json({ message: 'Device not found' });
    res.json(device);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to delete a device by ID
router.delete('/:id', async (req, res) => {
  try {
    const device = await deviceController.deleteDevice(req.params.id);
    if (!device) return res.status(404).json({ message: 'Device not found' });
    res.json({ message: 'Device deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
