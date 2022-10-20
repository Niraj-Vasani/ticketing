import experss from "express";
import "express-async-errors";
import { json } from "body-parser";
import coockiSession from "cookie-session";
import { errorHandler, NotFoundError } from "@sgtickets/common";

import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

const app = experss();
app.set('trust proxy', true);
app.use(json());
app.use(coockiSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signupRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app }