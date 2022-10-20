import experss from "express";
import "express-async-errors";
import { json } from "body-parser";
import coockiSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@sgtickets/common";

import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/shows";
import { indexTicketRouter } from "./routes";
import { updateTicketRouter } from "./routes/update";

const app = experss();
app.set('trust proxy', true);
app.use(json());
app.use(coockiSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));

app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app }