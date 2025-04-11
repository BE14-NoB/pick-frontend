// src/project/data/MenuData.js
export const menuItems = [
    // 사이드바용 메뉴
    {
        to: '/project/issues',
        label: 'ISSUE',
        type: 'menu',
        match: ['/project/issues', '/project/create-issue']
    },
    {
        to: '/project/commits',
        label: 'COMMIT',
        type: 'menu',
        match: ['/project/commits']
    },
    {
        to: '/project/pull-requests',
        label: 'PR',
        type: 'menu',
        match: ['/project/pull-requests', '/project/create-pull-request']
    },

    // 페이지별 정보
    {
        to: '/project/issues',
        label: 'ISSUE',
        title: '이슈 목록',
        description: 'gPalsqkqh',
        match: ['/project/issues'],
        type: 'page'
    },
    {
        to: '/project/create-issue',
        label: 'ISSUE',
        title: '이슈 생성',
        description: '새로운 이슈를 등록할 수 있습니다.',
        match: ['/project/create-issue'],
        type: 'page'
    },
    {
        to: '/project/pull-requests',
        label: 'PR',
        title: 'PR 목록',
        description: '혜민바보',
        match: ['/project/pull-requests'],
        type: 'page'
    },
    {
        to: '/project/create-pull-request',
        label: 'PR',
        title: 'PR 생성',
        description: '브랜치를 선택해 PR을 생성할 수 있습니다.',
        match: ['/project/create-pull-request'],
        type: 'page'
    },
    {
        to: '/project/commits',
        label: 'COMMIT',
        title: '커밋 내역',
        description: 'Git 커밋 기록을 조회할 수 있습니다.',
        match: ['/project/commits'],
        type: 'page'
      }

]
