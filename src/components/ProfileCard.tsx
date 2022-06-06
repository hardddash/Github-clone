import React, {useEffect, useState} from 'react';
import {IUserInfo} from "../interfaces";
import style from './ProfileCard.module.css'

const ProfileCard = () => {

    const [userInfo, setUserInfo] = useState<IUserInfo>({
        avatarUrl: '',
        bio: '',
        name: '',
        login: ''
    });

    useEffect(() => {
        getProfileInfo();
    }, []);

    const getProfileInfo = () => {
        const body = {
            "query": `
            query {
              user(login: \"${process.env.REACT_APP_GITHUB_USERNAME}\") {
                avatarUrl(size: 300)
                bio
                name
                login
              }
            }`
        }
        fetch(process.env.REACT_APP_GITHUB_BASEURL || "", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + process.env.REACT_APP_GITHUB_ACCESS_TOKEN
            },
            body: JSON.stringify(body)
        }).then(response => response.json())
            .then(data => {
                setUserInfo(data.data.user);
            })
            .catch(err => console.error(JSON.stringify(err)));
    };

    return (
        <div>
            <img className={style.userAvatar} src={userInfo.avatarUrl} alt="avatar" />
            <h2 className={style.userName}>{userInfo.name}</h2>
            <h4 className={style.userLogin}>{userInfo.login}</h4>
            <p className={style.userDescription}>{userInfo.bio}</p>
        </div>
    )
}

export default ProfileCard;