export const menuItems = [

    // 프로젝트 사이드바용 메뉴
    {
        to: '/project/dashboard',
        label: '대시보드',
        type: 'menu',
        match: ['/project/dashboard']
    },
    {
        to: '/project/info',
        label: '프로젝트 정보',
        type: 'menu',
        match: ['/project/info']
    },
    {
        to: '/project/member',
        label: '팀원',
        type: 'menu',
        match: ['/project/member']
    },
    {
        to: '/project/meeting',
        label: '회의록',
        type: 'menu',
        match: ['/project/meeting', '/project/create-meeting']
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
        match: ['/project/pull-requests', '/project/create-pull-request', '/project/review-pull-request']
    },
    {
        to: '/project/project-review',
        label: '프로젝트 후기',
        type: 'menu',
        match: ['/project/project-review']
    },


    // 페이지별 제목과 내용
    {
        to: '/project/info',
        label: 'INFO',
        title: '프로젝트 정보',
        description: '프로젝트에 대한 정보를 입력해주세요.',
        match: ['/project/info'],
        type: 'page'
    },
    {
        to: '/project/member',
        label: 'MEMBER',
        title: '팀원',
        description: '프로젝트에 참여하는 팀원 목록',
        match: ['/project/member'],
        type: 'page'
    },
    {
        to: '/project/meeting',
        label: 'MEETING',
        title: '회의록',
        description: '회의록 목록을 조회할 수 있습니다.',
        match: ['/project/meeting'],
        type: 'page'
    },
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
    },
    {
        to: '/project/project-review',
        label: 'PROJECT_REVIEW',
        title: '프로젝트 후기',
        description: '참여하신 프로젝트에 대한 후기를 남겨주세요.',
        match: ['/project/project-review'],
        type: 'page'
    }

]
