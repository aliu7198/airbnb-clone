const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { Spot, SpotImage } = require("../../db/models");

const router = express.Router();
/*****************************************************************************/

// Delete a Spot Image
// DELETE /spot-images/:imageId
router.delete("/:imageId", requireAuth, async (req, res) => {
  const { user } = req;
  const spotImage = await SpotImage.findByPk(req.params.imageId, { include: [{ model: Spot }] });

  if (!spotImage) {
    return res.status(404).json({
      message: "Spot Image couldn't be found",
    });
  }

  if (spotImage.Spot.ownerId !== user.id) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  await spotImage.destroy();
  return res.json({
    message: "Successfully deleted"
  });
});

/*****************************************************************************/
module.exports = router;
