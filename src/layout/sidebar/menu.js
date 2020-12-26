import {
    Home,
    Box,
    Airplay,
    Edit
} from 'react-feather';

export const MENUITEMS = [
    {
        title: 'Dashboard', icon: Home, type: 'sub', badgeType: 'primary', active: false, children: [
            { path: `${process.env.PUBLIC_URL}/dashboard/default`, title: 'Home', type: 'link' },
            // { path: `${process.env.PUBLIC_URL}/dashboard/hospital`, title: 'Hospital', type: 'link' }
        ]
    },
    {
        title: 'Jobs', icon: Airplay, type: 'sub', active: false, children: [
            { path: `${process.env.PUBLIC_URL}/jobs/add`, title: 'Add New Job', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/jobs/list`, title: 'All Job', type: 'link' },
        ]
    },
    {
        title: 'Others', icon: Box, type: 'sub', active: false, children: [
            { path: `${process.env.PUBLIC_URL}/others/add`, title: 'Add New', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/others/list`, title: 'All', type: 'link' }

        ]
    },
    {
        title: 'Manage', icon: Edit, type: 'sub', active: false, children: [
            { path: `${process.env.PUBLIC_URL}/base/popover`, title: 'Add New Circular', type: 'link' },
            { path: `${process.env.PUBLIC_URL}/base/tooltips`, title: 'All Circular', type: 'link' }

        ]
    },

]
