import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";


const AvatarCard = ({ avatar = [], max = 4 }) => {

    return (
        <Stack direction="row" spacing={1}>
            <AvatarGroup>
                <Box width={"5rem"} height={'3rem'}>
                    {avatar.map((url, i) => (
                        <Avatar
                            key={i}
                            alt={`Avatar ${i}`}
                            src={url}
                            sx={{
                                width: '2rem',
                                height: '2rem',
                                position: 'absolute',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                transition: 'left 0.3s ease-in-out',
                                opacity: i < max? 1 : 0,
                                cursor: 'pointer',
                                left: {
                                    xs: `${0.5 + i} rem`,
                                    sm: `${1}rem`
                                }
                            }}
                        />
                    ))}
                </Box>
            </AvatarGroup>
        </Stack>
    )
}

export default AvatarCard;