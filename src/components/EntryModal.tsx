import { categories } from "../utils/categories";
import PlusIcon from "@mui/icons-material/Add";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";
import type { Entry } from "~/utils/categories";

interface EntryModalProps {
  entry: Entry;
  type: string;
}

export default function EntryModal({ entry, type }: EntryModalProps) {
  const user = useUser();
  const router = useRouter();
  const addEntry = api.main.addEntry.useMutation();
  const updateEntry = api.main.updateEntry.useMutation();
  const deleteEntry = api.main.deleteEntry.useMutation();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(entry.name);
  const [link, setLink] = useState(entry.link);
  const [description, setDescription] = useState(entry.description);
  const [category, setCategory] = useState<string | number>(entry.category);

  const handleClickOpen = () => {
    setOpen(true);
    setName(entry.name);
    setLink(entry.link);
    setDescription(entry.description);
    setCategory(entry.category);
  };

  const handleClose = () => {
    setIsEditing(false);
    setOpen(false);
    router.reload();
  };

  const handleEdit = () => {
    updateEntry.mutate({
      id: entry.id as string,
      name: name,
      description: description,
      category: category as number,
      user: user?.user_metadata.name as string,
      user_id: user?.id as string,
      link: link,
    });

    handleClose();
  };

  const handleAdd = () => {
    addEntry.mutate({
      name: name,
      description: description,
      category: category as number,
      user: user?.user_metadata.name as string,
      user_id: user?.id as string,
      link: link,
    });

    handleClose();
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete?")) {
      deleteEntry.mutate({
        id: entry.id as string,
      });
      handleClose();
    }
  };

  const openButton =
    type === "edit" ? (
      <IconButton onClick={handleClickOpen}>
        <OpenInNewIcon />
      </IconButton>
    ) : type === "add" ? (
      <Button variant="contained" endIcon={<PlusIcon />} onClick={handleClickOpen}>
        Add Entry
      </Button>
    ) : null;

  const actionButtons =
    type === "edit" ? (
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color="warning" onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="contained" onClick={handleEdit} sx={{ display: isEditing ? "inline" : "none" }}>
          Confirm
        </Button>
        <Button variant="contained" onClick={() => setIsEditing(true)} sx={{ display: isEditing ? "none" : "inline" }}>
          Edit
        </Button>
      </DialogActions>
    ) : type === "add" ? (
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleAdd}>
          Add Entry
        </Button>
      </DialogActions>
    ) : null;

  return (
    <div>
      {openButton}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{type === "edit" ? name : "Add Entry"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            id="name"
            label="Name"
            fullWidth
            variant="standard"
            value={name}
            onChange={(event) => setName(event.target.value)}
            InputProps={{
              readOnly: type === "edit" ? !isEditing : false,
            }}
          />
          <TextField
            margin="normal"
            id="link"
            label="Link"
            placeholder="e.g. https://google.com"
            fullWidth
            variant="standard"
            value={link}
            onChange={(event) => {
              setLink(event.target.value);
            }}
            InputProps={{
              readOnly: type === "edit" ? !isEditing : false,
            }}
          />
          <TextField
            margin="normal"
            id="description"
            label="Description"
            fullWidth
            variant="standard"
            multiline
            maxRows={8}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            InputProps={{
              readOnly: type === "edit" ? !isEditing : false,
            }}
          />
          <FormControl fullWidth sx={{ marginTop: 3 }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={(event) => setCategory(event.target.value)}
              inputProps={{
                readOnly: type === "edit" ? !isEditing : false,
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        {actionButtons}
      </Dialog>
    </div>
  );
}
