import experss from "express";
import "express-async-errors";
import { json } from "body-parser";
import coockiSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@sgtickets/common";
import { createChargeRouter } from "./routes/new";

const app = experss();
app.set('trust proxy', true);
app.use(json());
app.use(coockiSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));

app.use(currentUser);

app.use(createChargeRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app }