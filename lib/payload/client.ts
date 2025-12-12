import { getPayload } from "payload";
import configPromise from "@payload-config";

export const getPayloadClient = async () => getPayload({ config: configPromise });
