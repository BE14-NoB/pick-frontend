// src/project/data/MenuData.js
export const menuItems = [
    // 사이드바용 메뉴
    {
        to: '/project/dashboard',
        label: 'DASHBOARD',
        type: 'menu',
        match: ['/project/dashboard', '/project/dashboard']
    },
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
        description: '이슈 목록을 조회할 수 있습니다.',
        match: ['/project/issues'],
        type: 'page'
    },
    {
        to: '/project/create-issue',
        label: 'ISSUE',
        title: '이슈 생성하기',
        description: '작성한 이슈는 프로젝트 레포지토리에 자동으로 등록됩니다.',
        match: ['/project/create-issue'],
        type: 'page'
    },
    {
        to: '/project/pull-requests',
        label: 'PR',
        title: 'PR 목록',
        description: 'PR 목록을 조회할 수 있습니다.',
        match: ['/project/pull-requests'],
        type: 'page'
    },
    {
        to: '/project/create-pull-request',
        label: 'PR',
        title: 'PR 생성하기',
        description: '작성한 PR은 프로젝트 레포지토리에 자동으로 등록됩니다.',
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
