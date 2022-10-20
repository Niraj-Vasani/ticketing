import experss from "express";
import "express-async-errors";
import { json } from "body-parser";
import coockiSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@sgtickets/common";

import { indexOrderRouter } from "./routes";
import { deleteOrderRouter } from "./routes/delete";
import { newOrderRouter } from "./routes/new";
import { showOrderRouter } from "./routes/show";

const app = experss();
app.set('trust proxy', true);
app.use(json());
app.use(coockiSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));

app.use(currentUser);

app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app }