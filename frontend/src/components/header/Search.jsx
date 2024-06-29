import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, List, ListItem, ListItemText, Stack, TextField } from "@mui/material";
import { useInputValidation } from '6pp'
import { Search as SearchIcon } from "@mui/icons-material";
import { useState } from "react";
import UserItem from "./UserItem";

const newFriendList = [
    { name: 'John Doe', id: '1' },
    { name: 'Jane Doe', id: '2' },
    { name: 'Alice Doe', id: '3' },
    { name: 'Bob Doe', id: '4' },
    { name: 'Charlie Doe', id: '5' },
    { name: 'David Doe', id: '6' },
    { name: 'Emily Doe', id: '7' },
    { name: 'Frank Doe', id: '8' },
    { name: 'Grace Doe', id: '9' },
    { name: 'Henry Doe', id: '10' },
    { name: 'Isabella Doe', id: '11' },
    { name: 'Jack Doe', id: '12' },
    { name: 'Karen Doe', id: '13' },
]

const Search = () => {
    const search = useInputValidation('')
    const [focus, setFocus] = useState(false)
    const [isLoadingSendFriendReq, setIsLoadingSendFriendReq] = useState(false);


    const filterFriends = (friend) => {
        return friend.name.toLowerCase().includes(search.value.toLowerCase());
    };

    const renderFriend = (friend) => (
        <UserItem
            key={friend.id}
            user={friend}
            handler={handleAddFriend}
            handlerIsLoading={isLoadingSendFriendReq}
        />
    );
    const handleAddFriend = (id) => {
        console.log('Add friend' , id)
        setIsLoadingSendFriendReq(true);
        // send friend request
        setIsLoadingSendFriendReq(false);
    }
    return (
        <Dialog open>
            <Stack
                p={'1rem'}
                direction={'column'}
                width={'25rem'}
            >
                <DialogTitle textAlign={'center'}>Search for a friend</DialogTitle>
                <TextField
                    id=""
                    label="serach"
                    value={search.value}
                    onChange={search.changeHandler}
                    variant="outlined"
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                    onFocus={() => setFocus(true)}
                // onBlur={() => setFocus(false)}
                />
                {
                    focus &&
                    <List>
                        {
                            newFriendList.filter(filterFriends).map(renderFriend)

                        }
                    </List>
                }
            </Stack>
        </Dialog>
    )
}

export default Search;