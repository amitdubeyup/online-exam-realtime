module.exports = {
  checkUpdate: checkUpdate,
}

function checkUpdate(req, res) {
  if (req.body.versionNumber) {
    const oldVersionNumber = (req.body.versionNumber).toString();
    const newVersionNumber = '0.0.8';
    const oldArr = oldVersionNumber.split('.');
    const newArr = newVersionNumber.split('.');
    const oldSum = parseInt(oldArr[0], 10) * 100 + parseInt(oldArr[1], 10) * 10 + parseInt(oldArr[2], 10);
    const newSum = parseInt(newArr[0], 10) * 100 + parseInt(newArr[1], 10) * 10 + parseInt(newArr[2], 10);
    if (newSum > oldSum) {
      res.status(200);
      return res.json({
        success: true,
        message: `A new version(${newVersionNumber}) of app is available.`,
        data: newVersionNumber,
      });
    } else {
      res.status(400);
      return res.json({
        success: false,
        message: "There is no update available!",
      });
    }
  } else {
    res.status(400);
    return res.json({
      success: false,
      message: "There is no update available!",
    });
  }
}