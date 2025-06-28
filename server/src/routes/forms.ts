import { Router, Request, Response } from "express";
import Form from "../models/Form";
import { sanitizeFormInput } from "../utils/sanitizers";

const router = Router();
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, fields } = sanitizeFormInput(req.body.name, req.body.fields);
    const form = await Form.create({ name, fields });
    res.status(201).json(form);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});
router.get("/", async (req: Request, res: Response) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });
    res.json(forms);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).json({ error: "Form not found" });
    res.json(form);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { name, fields } = sanitizeFormInput(req.body.name, req.body.fields);
    const updated = await Form.findByIdAndUpdate(
      req.params.id,
      { name, fields },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Form not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deleted = await Form.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Form not found" });
    res.json({ message: "Form deleted" });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
