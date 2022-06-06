export interface IRepository {
    node: {
        name: string,
        description: null | string,
        forkCount: number,
        isPrivate: boolean,
        languages: {
            nodes: {
                color: string,
                name: string
            }[]
        },
        licenseInfo: {
            name: string
        }
        updatedAt: string,
        url: string,
        stargazerCount: number,
        databaseId: number
    }
}

export interface IUserInfo {
    avatarUrl: string,
    bio: string,
    name: string,
    login: string
}

export interface INavBar {
    repositoriesNumber: number,
    projectsNumber: number,
    packagesNumber: number,
}