import { Avatar, IconButton, ListItem, ListItemText, Stack, Typography } from "@mui/material"
import { memo } from "react"
import { Add as AddIcon } from "@mui/icons-material"

const UserItem = ({
    user,
    handler,
    handlerIsLoading
}) => {
    const { name, id, avatar } = user
    return (
        <ListItem itemID={id} >
            <Stack
                direction={'row'}
                spacing={'1rem'}
                alignItems={'center'}
                color={'primary'}
                width={'100%'}
            >
                <Avatar
                    alt={name}
                    src={avatar}
                />
                <Typography variant="body1" color="initial"
                    sx={{
                        flexGrow: 1,
                        display: "-webkit-box",
                        WebkitlineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        letterSpacing: '0.05em',
                        fontSize: '1rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}
                >
                    {name}
                </Typography>
                <IconButton
                    size="small"
                    sx={{
                        bgcolor: 'primary.main',
                        color: 'primary.white',
                        "&:hover": {
                            backgroundColor: 'primary.dark',
                            color: 'primary.contrastText',
                        }
                    }}
                    onClick={() => handler(id)}
                    disabled={handlerIsLoading}
                >
                    <AddIcon />
                </IconButton>
            </Stack>
        </ListItem>
    )
}

export default memo(UserItem)