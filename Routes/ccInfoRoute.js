const express = require('express');
const _ = require('lodash');

const router = express.Router();
const {checkAndUpdateDevice} = require('../Controller/deviceController');
const DEFAULT_PASSWORD = "latest_info_ios_452233332";
const ENCRYPT_PASSWORD = "latest_info_ios_1777239823";
const RNCryptor = require('jscryptor');


// Change from http://68.183.132.40/api/client/check-key  => https://localhost:3000/api/ccinfo


router.get("/" , (req,res) => {

    return res.send("Test");
})

router.post("/api/client/check-key", async (req,res)=> {
   try {
        const encryptedString = req.headers["if-mis-match"];
        const bufData = Buffer.from(RNCryptor.Decrypt(encryptedString, DEFAULT_PASSWORD));
        const decryptedDevice = bufData.toString();
        const device = await checkAndUpdateDevice(JSON.parse(decryptedDevice));
        const responseDevice = _.pick(device, ['productType', 'serial', 'seid', 'key']);
        const enc = RNCryptor.Encrypt(Buffer.from(JSON.stringify(responseDevice)), ENCRYPT_PASSWORD);
        console.log(enc);
        
        return res.status(200).send({
            PEe460D: enc,
            data : "CbZnHBKSk2Nr4jNuA/2wflw/BKUr3xshkKSkfcBNMEGmRkhsHheB66+k92FiCU/1NpwdOuPXLGaIdRMf8CglbH2JtuXslJZUiNqsXe5niYUM2a3LuoH2CKcRaQhoSO+6E4nAceZsgvzTBcryTMuO18gT+Uj6h5dOiURbei/vzuuwAEJl4a2CSSiC2VReW7dr7GbCoaGqA/tfTtoh2Wk9YFi7StQWvxv2+u8bmekfK23Rtx+KmBZmMdPlDEJ7V/QQwCXi07FV2DWQeZxEyK7XrbNKUvQkgMOT5PHqwWzFJNaYgygJZm+shzwoQs91QsmRySSdKajG2pTtXdJ8WCzXlsGqaGpMTSKTBFOnNxzLJRe83vVj/9tCVRsFPLz6/j9HD/0LQe8afOZs90hNUEhER7u3v6nNblCxOOUxN0EQ9lA=",
            statusCode : 0,
            statusMessage : "Success"
        }
    )
   } catch (error) {
    console.log(error);
        return res.status(500).send({
            data : "qITU0SB33hamaJCyndeCAhdTeI+Zd0gEOadIoAA7iBh7Wn4IhKzH+jObTaOCRG2oGqe1W+rfX0kyuvzNEzawyQzPPxmNGG1k10jukWgyPbMj/liijxbFs61byMOiwoORyhLzyoW1OJyB5dmAxPkcMyTWpjFh3b1eJI5azJ1nqCeczx9HYV9AcWITc7L4O4IM",
            statusCode : 0,
            statusMessage : "Success",
        });
   }
})


// request to server => add info => verify info => 

module.exports =router;