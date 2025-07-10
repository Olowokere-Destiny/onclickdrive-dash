import { NextApiRequest, NextApiResponse } from "next";
import { Table } from "@/lib/models/tableModel";
import { connectDb } from "@/lib/connectMongodb";
import { Types } from "mongoose";

export default async function editStatus(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, admin, status } = req.body;

  if (!id||!admin||!status) {
    return res.status(400).json({message: "All feilds required"})
  }

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  try {
    await connectDb();
    const row = await Table.findById(id);
    if (!row) {
      return res.status(404).json({ message: "Not found" });
    }

    const obj = {
      status,
      history: row.history,
    };

    if (row.status !== status) {
      obj.status = status
      obj.history.push({ user: admin, action: status });
    } else {
      return res.status(400).json({message: "Send a different status"})
    }

    const newObj = await Table.findByIdAndUpdate(id, obj, {
      new: true,
    });

    return res.status(200).json(newObj);
  } catch (error) {
    return res.status(500).json({ message: "Server error occurred" });
  }
}
