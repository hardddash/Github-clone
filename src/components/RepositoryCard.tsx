import React from 'react';
import {IRepository} from "../interfaces";
import style from "./RepositoryCard.module.css";

interface IProps {
    repository: IRepository
}

const month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function timeDifference(date: string): string {
    const date1 = new Date(date);
    const date1utc = date1.getTime();
    const date2utc = (new Date()).getTime();
    const day = 1000 * 60 * 60 * 24;
    const daysDifference = (date2utc - date1utc) / day;
    if (daysDifference >= 1) {
        return `Updated on ${date1.getDate()} ${month_names_short[date1.getMonth()]}`;
    } else if ((daysDifference * 60) >= 1) {
        return `Updated ${Math.round(daysDifference * 60)} hour${((daysDifference * 60) > 1)? 's' : ''} ago`;
    } else {
        return `Updated ${Math.round(daysDifference * 360)} minute${((daysDifference * 360) > 1)? 's' : ''} ago`;
    }
}

const RepositoryCard: React.FC<IProps> = ({repository}) => {

    const unstarredId = `unstarred${repository.node.databaseId}`;
    const starredId = `starred${repository.node.databaseId}`;

    function replace( hide: string, show: string ) {
        document.getElementById(hide)!.style.display="none";
        document.getElementById(show)!.style.display="inline-block";
    }

    return (
        <div>
            {
                repository.node &&
                <div className={style.repositoryCardContainer}>
                    <div className={style.repositoryCardItem1}>
                        <a href={repository.node.url}>{repository.node.name}</a>
                        <span className={style.circledLabel}>{(repository.node.isPrivate)? 'Private': 'Public'}</span>
                    </div>
                    <div className={style.repositoryCardItem2}>
                        <div id={unstarredId} className={style.starLabel} style={{display: "inline-block"}} onClick={() => replace(unstarredId, starredId)}>
                            <svg>
                                <path fillRule="evenodd"
                                      d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                            </svg>
                            <span>Star</span>
                        </div>
                        <div id={starredId} className={style.starLabel} style={{display: "none"}} onClick={() => replace(starredId, unstarredId)}>
                            <svg style={{fill: "#e3b341"}}>
                                <path fillRule="evenodd"
                                      d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path>
                            </svg>
                            <span>Starred</span>
                        </div>
                    </div>
                    <div className={style.repositoryCardItem3}>
                        <p>{repository.node.description}</p>
                    </div>
                    <div className={style.repositoryCardItem4}>
                        {
                            repository.node.languages.nodes.length !== 0 &&
                            <div className={style.label}>
                                <span className={style.dot} style={{backgroundColor: repository.node.languages.nodes[0].color}}></span>
                                <span>{repository.node.languages.nodes[0].name}</span>
                            </div>
                        }
                        {
                            repository.node.forkCount !== 0 &&
                            <div className={style.label}>
                                <svg>
                                    <path fillRule="evenodd"
                                          d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
                                </svg>
                                <span>{repository.node.forkCount}</span>
                            </div>
                        }
                        {
                            repository.node.licenseInfo?.name &&
                            <div className={style.label}>
                                <svg>
                                    <path fillRule="evenodd"
                                          d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"></path>
                                </svg>
                                <span>{repository.node.licenseInfo.name}</span>
                            </div>
                        }
                        {
                            repository.node.stargazerCount !== 0 &&
                            <div className={style.label}>
                                <svg>
                                    <path fillRule="evenodd"
                                          d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                                </svg>
                                <span>{repository.node.stargazerCount}</span>
                            </div>
                        }
                        {
                            <div className={style.label}>
                                <span>{timeDifference(repository.node.updatedAt)}</span>
                            </div>
                        }
                    </div>
                    <div className={style.repositoryCardItem5}>
                        <img src={require("../images/graph.JPG")} style={{width: "155px", height: "30px"}} />
                    </div>
                </div>
            }
        </div>
    )
}

export default RepositoryCard;
