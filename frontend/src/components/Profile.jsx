import { AlternateEmail, CalendarMonth, Face, Face2, PersonPinCircleOutlined } from "@mui/icons-material";
import { Avatar, Stack, Typography } from "@mui/material";
import moment from 'moment'

const Profile = () => {
    return (    
        <Stack spacing={'2rem'} direction={'column'} alignItems={'center'}>
            <Avatar
                sx={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                    objectFit: 'contain'
                }}
            />

            <ProfileCard
                text={'I am a Developer'}
                icon={<PersonPinCircleOutlined />}
                heading={'Bio'}
            />
            <ProfileCard
                text={'username'}
                icon={<AlternateEmail />}
                heading={'@koustav'}
            />
            <ProfileCard
                text={'Koustav Maity'}
                icon={<Face />}
                heading={'Name'}
            />
            <ProfileCard
                text={'Joined'}
                icon={<CalendarMonth />}
                heading={moment().format("MMM Do YY")}
            />

        </Stack>
    )
}


const ProfileCard = ({ text, icon, heading }) => (
    <Stack
        direction={'row'}
        spacing={'1rem'}
        alignItems={'center'}
        color={'white'}
        textAlign={'center'}
    >
        {icon && icon}
        <Stack>
            <Typography variant="body1">{text}</Typography>
            <Typography variant="caption" color={'grey'}>{heading}</Typography>
        </Stack>
    </Stack>
)


export default Profile;



