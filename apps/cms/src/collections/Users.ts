import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  access: {
    // Block public self-signup. Payload only shows the admin-panel
    // "create first user" form when the collection is empty (bootstrap
    // case) — seed.ts creates the initial users via the local API, so
    // that bypass is never hit in practice. After that, only a logged-in
    // admin can create more users (invite-only).
    create: ({ req }) => req.user?.role === "admin",
  },
  admin: {
    useAsTitle: "email",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
    },
  ],
};
