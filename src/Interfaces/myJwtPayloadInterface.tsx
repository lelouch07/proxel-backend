import { JwtPayload } from "jsonwebtoken";

interface MyJwtPayload extends JwtPayload {
    user: {
        id: string;
        // Other user properties go here
    };
}

export {MyJwtPayload};
