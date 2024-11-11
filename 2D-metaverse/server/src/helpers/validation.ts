import z from "zod";

const SignUpSchema = z.object({
  username: z.string().min(3, {message: "Username should be atleast 3"}),
  password: z.string().min(5, {message: "password should be atleast 5"}),
  role: z.enum(["Admin", "User"]).optional(),
});

const SignInSchema = z.object({
  username: z.string().min(1, {message: "Username is required"}),
  password: z.string().min(1, {message: "Password is required"}),
});

const CreateSpaceSchema = z.object({
  name: z.string(),
  dimensions: z.string().regex(/^[0-9]{1,4}x[0-9]{1,4}$/),
  mapId: z.string().optional(),
});

const DeleteElementSchema = z.object({
  id: z.string(),
});


const DeleteElementInSpaceSchema = z.object({
  elementId: z.string(),
  spaceId: z.string(),
})

const AddElementSchema = z.object({
  spaceId: z.string(),
  elementId: z.string(),
  x: z.coerce.number(),
  y: z.coerce.number(),
});

const CreateElementSchema = z.object({
  imageUrl: z.string(),
  width: z.number(),
  height: z.number(),
  static: z.boolean(),
});

const UpdateElementSchema = z.object({
    imageUrl: z.string(),
});

const CreateAvatarSchema = z.object({
  name: z.string(),
  imageUrl: z.string(),
});

const CreateMapSchema = z.object({
  thumbnail: z.string(),
  dimensions: z.string().regex(/^[0-9]{1,4}x[0-9]{1,4}$/),
  name: z.string(),
  defaultElements: z.array(
    z.object({
      elementId: z.string(),
      x: z.number(),
      y: z.number(),
    })
  ),
});

const UpdateMetaDataSchema = z.object({
  avatarId: z.string(),
});

export {
  UpdateMetaDataSchema,
  SignInSchema,
  SignUpSchema,
  UpdateElementSchema,
  CreateAvatarSchema,
  CreateElementSchema,
  CreateMapSchema,
  DeleteElementSchema,
  AddElementSchema,
  CreateSpaceSchema,
  DeleteElementInSpaceSchema,
};
