import React from 'react';

export default function TeamUsers() {
  return (
    <List dense={dense}>
      <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Single-line item"
          secondary={secondary ? 'Secondary text' : null}
        />
      </ListItem>
    </List>
  );
}
