import express from 'express'
const app = express();


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

import adminRouter from "./routes/v1/admin.routes";
import spaceRouter from "./routes/v1/space.routes";
import userRouter from "./routes/v1/user.routes";

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/spaces", spaceRouter);
app.use("/api/v1/users", userRouter);

export default app;