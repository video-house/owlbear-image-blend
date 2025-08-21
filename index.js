import { OBR } from "@owlbear-rodeo/sdk";

const BLEND_MODES = [
  "MULTIPLY",
  "SCREEN",
  "OVERLAY",
  "DARKEN",
  "LIGHTEN",
  "COLOR_DODGE",
  "COLOR_BURN"
];

OBR.onReady(async () => {
  console.log("Image Blend Tool loaded!");

  // Add a toolbar button
  OBR.tool.create({
    id: "image-blend-tool/select",
    icons: [{ icon: "icon.png", label: "Image Blend" }],
    shortcut: "B",
    onClick: async () => {
      const selection = await OBR.player.getSelection();
      if (selection.length === 0) {
        alert("Select an image first!");
        return;
      }

      const [id] = selection;
      const item = await OBR.scene.items.getItem(id);

      if (item.type !== "IMAGE") {
        alert("You must select an image item.");
        return;
      }

      // Ask user for a blend mode
      const mode = prompt(
        `Enter blend mode:\n${BLEND_MODES.join(", ")}`,
        "MULTIPLY"
      );
      if (!mode || !BLEND_MODES.includes(mode)) return;

      // Apply effect
      await OBR.scene.items.updateItems([id], (items) => {
        for (const i of items) {
          i.effects = [
            {
              id: "image-blend-effect",
              type: "EFFECT",
              blendMode: mode,
              visible: true
            }
          ];
        }
      });
    }
  });
});
