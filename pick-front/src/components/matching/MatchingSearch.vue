<template>
    <div class="search-container">
        <div class="header">
            <div class="tab-group">
                <button class="tab-button" :class="{ active: activeTab === 'random' }" @click="setActiveTab('random')">
                    <span class="icon">
                        <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.92817 4.73357C8.62437 2.29287 10.0301 1.07252 12.06 1.09253C14.0246 1.11253 15.4277 2.36356 16.0705 4.73891C16.1559 4.49484 16.2119 4.32545 16.2732 4.15741C16.752 2.86637 17.679 2.09681 19.042 1.98478C20.2957 1.88342 21.3093 2.43424 21.9415 3.52256C22.6257 4.69356 22.5484 5.87523 21.7401 6.96088C21.46 7.33565 21.4827 7.43701 21.8988 7.64774C23.2966 8.35194 23.9821 9.52694 23.9968 11.0887C24.0154 13.0039 24.0141 13.0053 22.1656 13.6134C21.6827 13.7846 21.1821 13.9004 20.6732 13.9589C20.3677 13.9869 20.125 13.8869 20.077 13.5681C20.029 13.2493 20.2317 13.068 20.5304 13.0186C21.2556 12.91 21.9627 12.7036 22.6324 12.4051C22.8098 12.3237 23.0325 12.2717 23.0325 12.0117C23.0325 11.2808 23.1259 10.5366 22.7924 9.84704C22.3803 8.99479 21.7321 8.40796 20.7705 8.29326C19.7753 8.18857 18.7721 8.18588 17.7763 8.28525C17.5118 8.31699 17.2544 8.39272 17.0148 8.50932C16.2346 8.86275 16.2252 8.98145 16.8134 9.6003C17.6173 10.417 18.0896 11.5029 18.1391 12.6478C18.1631 13.1813 18.0831 13.7228 18.1604 14.2483C18.2938 15.1192 17.8804 15.502 17.1255 15.8194C13.5138 17.3372 9.95809 17.2718 6.41841 15.5967C5.99562 15.3966 5.81423 15.1446 5.84758 14.6738C5.88492 14.1403 5.86225 13.6068 5.84758 13.0733C5.82357 11.6062 6.32638 10.3685 7.41603 9.39891C7.7788 9.07615 7.66143 8.93211 7.35468 8.71604C6.34505 8.00384 3.08679 8.01985 2.08917 8.75206C1.18891 9.41758 0.667427 10.9834 0.971514 12.0557C1.04087 12.2957 1.23826 12.3438 1.40764 12.4211C2.0365 12.7034 2.7011 12.8982 3.38287 12.9999C3.69763 13.0466 3.96704 13.1827 3.92303 13.5454C3.87368 13.9455 3.56026 13.9962 3.21749 13.9455C2.19586 13.7948 1.24493 13.4307 0.321995 12.9826C0.237409 12.9512 0.163762 12.896 0.110012 12.8235C0.0562626 12.751 0.0247269 12.6645 0.0192411 12.5745C0.0312446 11.5369 -0.132802 10.4859 0.321995 9.48693C0.691358 8.64329 1.36045 7.96659 2.19987 7.58772C2.46661 7.46369 2.59998 7.397 2.35724 7.08358C1.46365 5.95525 1.34629 4.72423 2.0905 3.48255C2.73602 2.40624 3.75364 1.86341 5.00734 1.99145C6.48909 2.14216 7.41869 3.02108 7.81881 4.45482C7.83615 4.51751 7.86949 4.57619 7.92817 4.73357ZM12.004 9.12816C11.4705 9.12816 10.937 9.10949 10.4035 9.12816C9.46236 9.17333 8.57244 9.57026 7.91 10.2404C7.24755 10.9105 6.86087 11.8049 6.82652 12.7465C6.81185 13.1907 6.85587 13.6388 6.80785 14.0802C6.75184 14.5937 6.98124 14.8285 7.4307 15.0138C10.3155 16.1902 13.215 16.2542 16.1385 15.1819C17.1935 14.7938 17.1895 14.7818 17.1882 13.6868C17.1882 13.376 17.1882 13.0653 17.1802 12.7532C17.1465 11.8112 16.7604 10.9161 16.0981 10.2453C15.4359 9.57442 14.546 9.17669 13.6045 9.13083C13.071 9.10816 12.5375 9.12816 12.004 9.12816ZM15.0542 5.08034C15.0494 4.27102 14.7234 3.49674 14.1477 2.92784C13.5721 2.35895 12.794 2.04203 11.9847 2.0468C11.1753 2.05158 10.4011 2.37766 9.83218 2.95331C9.26328 3.52896 8.94636 4.30703 8.95113 5.11635C8.9618 6.76082 10.3862 8.17456 12.0213 8.16122C13.6565 8.14788 15.0716 6.72481 15.0542 5.08034ZM4.7766 7.25163C5.34942 7.24389 5.89579 7.00926 6.29584 6.59921C6.69589 6.18916 6.91696 5.63717 6.91055 5.06433C6.89054 3.89333 5.87692 2.89838 4.71659 2.91972C3.55625 2.94106 2.5493 3.97469 2.5693 5.12435C2.5867 5.6969 2.82734 6.23995 3.23979 6.63745C3.65224 7.03495 4.2038 7.25537 4.7766 7.25163ZM19.2541 7.25163C19.8266 7.24792 20.375 7.02084 20.7826 6.61877C21.1901 6.2167 21.4246 5.6714 21.436 5.09901C21.4216 4.52669 21.1886 3.98161 20.7847 3.5758C20.3809 3.16999 19.837 2.93426 19.2648 2.91705C18.6913 2.92769 18.1444 3.1606 17.7393 3.56666C17.3343 3.97271 17.1027 4.5202 17.0935 5.09367C17.0949 5.66615 17.323 6.21476 17.7279 6.61943C18.1329 7.02411 18.6816 7.2519 19.2541 7.25296V7.25163ZM9.46995 8.2039C8.62479 7.46799 8.08493 6.44297 7.95618 5.32974C7.80947 5.76853 7.75346 6.03394 7.63609 6.26334C7.4427 6.64879 6.96923 7.09025 7.05726 7.37033C7.15462 7.68775 7.80014 7.79578 8.10022 8.09987C8.51901 8.52799 8.90312 8.58934 9.46995 8.2039ZM14.474 8.27725C14.9529 8.33727 15.2423 8.71204 15.601 8.35194C15.9425 8.00259 16.3507 7.72547 16.8014 7.53704C17.0001 7.45568 17.1201 7.36099 16.9227 7.1596C16.468 6.6968 16.2852 6.09263 16.0345 5.33107C15.8878 6.58343 15.3476 7.45568 14.4727 8.27725H14.474Z" fill="currentColor" stroke="currentColor" stroke-width="0.3"/>
                        </svg>
                    </span>
                    Random Matching
                </button>
                <button class="tab-button" :class="{ active: activeTab === 'private' }" @click="setActiveTab('private')">
                    <span class="icon">
                        <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.92817 4.73357C8.62437 2.29287 10.0301 1.07252 12.06 1.09253C14.0246 1.11253 15.4277 2.36356 16.0705 4.73891C16.1559 4.49484 16.2119 4.32545 16.2732 4.15741C16.752 2.86637 17.679 2.09681 19.042 1.98478C20.2957 1.88342 21.3093 2.43424 21.9415 3.52256C22.6257 4.69356 22.5484 5.87523 21.7401 6.96088C21.46 7.33565 21.4827 7.43701 21.8988 7.64774C23.2966 8.35194 23.9821 9.52694 23.9968 11.0887C24.0154 13.0039 24.0141 13.0053 22.1656 13.6134C21.6827 13.7846 21.1821 13.9004 20.6732 13.9589C20.3677 13.9869 20.125 13.8869 20.077 13.5681C20.029 13.2493 20.2317 13.068 20.5304 13.0186C21.2556 12.91 21.9627 12.7036 22.6324 12.4051C22.8098 12.3237 23.0325 12.2717 23.0325 12.0117C23.0325 11.2808 23.1259 10.5366 22.7924 9.84704C22.3803 8.99479 21.7321 8.40796 20.7705 8.29326C19.7753 8.18857 18.7721 8.18588 17.7763 8.28525C17.5118 8.31699 17.2544 8.39272 17.0148 8.50932C16.2346 8.86275 16.2252 8.98145 16.8134 9.6003C17.6173 10.417 18.0896 11.5029 18.1391 12.6478C18.1631 13.1813 18.0831 13.7228 18.1604 14.2483C18.2938 15.1192 17.8804 15.502 17.1255 15.8194C13.5138 17.3372 9.95809 17.2718 6.41841 15.5967C5.99562 15.3966 5.81423 15.1446 5.84758 14.6738C5.88492 14.1403 5.86225 13.6068 5.84758 13.0733C5.82357 11.6062 6.32638 10.3685 7.41603 9.39891C7.7788 9.07615 7.66143 8.93211 7.35468 8.71604C6.34505 8.00384 3.08679 8.01985 2.08917 8.75206C1.18891 9.41758 0.667427 10.9834 0.971514 12.0557C1.04087 12.2957 1.23826 12.3438 1.40764 12.4211C2.0365 12.7034 2.7011 12.8982 3.38287 12.9999C3.69763 13.0466 3.96704 13.1827 3.92303 13.5454C3.87368 13.9455 3.56026 13.9962 3.21749 13.9455C2.19586 13.7948 1.24493 13.4307 0.321995 12.9826C0.237409 12.9512 0.163762 12.896 0.110012 12.8235C0.0562626 12.751 0.0247269 12.6645 0.0192411 12.5745C0.0312446 11.5369 -0.132802 10.4859 0.321995 9.48693C0.691358 8.64329 1.36045 7.96659 2.19987 7.58772C2.46661 7.46369 2.59998 7.397 2.35724 7.08358C1.46365 5.95525 1.34629 4.72423 2.0905 3.48255C2.73602 2.40624 3.75364 1.86341 5.00734 1.99145C6.48909 2.14216 7.41869 3.02108 7.81881 4.45482C7.83615 4.51751 7.86949 4.57619 7.92817 4.73357ZM12.004 9.12816C11.4705 9.12816 10.937 9.10949 10.4035 9.12816C9.46236 9.17333 8.57244 9.57026 7.91 10.2404C7.24755 10.9105 6.86087 11.8049 6.82652 12.7465C6.81185 13.1907 6.85587 13.6388 6.80785 14.0802C6.75184 14.5937 6.98124 14.8285 7.4307 15.0138C10.3155 16.1902 13.215 16.2542 16.1385 15.1819C17.1935 14.7938 17.1895 14.7818 17.1882 13.6868C17.1882 13.376 17.1882 13.0653 17.1802 12.7532C17.1465 11.8112 16.7604 10.9161 16.0981 10.2453C15.4359 9.57442 14.546 9.17669 13.6045 9.13083C13.071 9.10816 12.5375 9.12816 12.004 9.12816ZM15.0542 5.08034C15.0494 4.27102 14.7234 3.49674 14.1477 2.92784C13.5721 2.35895 12.794 2.04203 11.9847 2.0468C11.1753 2.05158 10.4011 2.37766 9.83218 2.95331C9.26328 3.52896 8.94636 4.30703 8.95113 5.11635C8.9618 6.76082 10.3862 8.17456 12.0213 8.16122C13.6565 8.14788 15.0716 6.72481 15.0542 5.08034ZM4.7766 7.25163C5.34942 7.24389 5.89579 7.00926 6.29584 6.59921C6.69589 6.18916 6.91696 5.63717 6.91055 5.06433C6.89054 3.89333 5.87692 2.89838 4.71659 2.91972C3.55625 2.94106 2.5493 3.97469 2.5693 5.12435C2.5867 5.6969 2.82734 6.23995 3.23979 6.63745C3.65224 7.03495 4.2038 7.25537 4.7766 7.25163ZM19.2541 7.25163C19.8266 7.24792 20.375 7.02084 20.7826 6.61877C21.1901 6.2167 21.4246 5.6714 21.436 5.09901C21.4216 4.52669 21.1886 3.98161 20.7847 3.5758C20.3809 3.16999 19.837 2.93426 19.2648 2.91705C18.6913 2.92769 18.1444 3.1606 17.7393 3.56666C17.3343 3.97271 17.1027 4.5202 17.0935 5.09367C17.0949 5.66615 17.323 6.21476 17.7279 6.61943C18.1329 7.02411 18.6816 7.2519 19.2541 7.25296V7.25163ZM9.46995 8.2039C8.62479 7.46799 8.08493 6.44297 7.95618 5.32974C7.80947 5.76853 7.75346 6.03394 7.63609 6.26334C7.4427 6.64879 6.96923 7.09025 7.05726 7.37033C7.15462 7.68775 7.80014 7.79578 8.10022 8.09987C8.51901 8.52799 8.90312 8.58934 9.46995 8.2039ZM14.474 8.27725C14.9529 8.33727 15.2423 8.71204 15.601 8.35194C15.9425 8.00259 16.3507 7.72547 16.8014 7.53704C17.0001 7.45568 17.1201 7.36099 16.9227 7.1596C16.468 6.6968 16.2852 6.09263 16.0345 5.33107C15.8878 6.58343 15.3476 7.45568 14.4727 8.27725H14.474Z" fill="currentColor" stroke="currentColor" stroke-width="0.3"/>
                        </svg>
                    </span>
                    Private Matching
                </button>
            </div>
            <button class="create-project-button" @click="createMatching">
                프로젝트 생성
                <teleport to="body">
                    <MatchingCreate 
                        v-if="showModal"
                        @close="showModal = false"
                        @create="handleCreateMatching"
                        />
                    </teleport>
                </button>
        </div>
        <div v-if="activeTab === 'random'" class="search-form">
            <div class="form-group">
                <span class="icon">
                    <!-- 아이콘 이미지 -->
                    <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.92817 4.73357C8.62437 2.29287 10.0301 1.07252 12.06 1.09253C14.0246 1.11253 15.4277 2.36356 16.0705 4.73891C16.1559 4.49484 16.2119 4.32545 16.2732 4.15741C16.752 2.86637 17.679 2.09681 19.042 1.98478C20.2957 1.88342 21.3093 2.43424 21.9415 3.52256C22.6257 4.69356 22.5484 5.87523 21.7401 6.96088C21.46 7.33565 21.4827 7.43701 21.8988 7.64774C23.2966 8.35194 23.9821 9.52694 23.9968 11.0887C24.0154 13.0039 24.0141 13.0053 22.1656 13.6134C21.6827 13.7846 21.1821 13.9004 20.6732 13.9589C20.3677 13.9869 20.125 13.8869 20.077 13.5681C20.029 13.2493 20.2317 13.068 20.5304 13.0186C21.2556 12.91 21.9627 12.7036 22.6324 12.4051C22.8098 12.3237 23.0325 12.2717 23.0325 12.0117C23.0325 11.2808 23.1259 10.5366 22.7924 9.84704C22.3803 8.99479 21.7321 8.40796 20.7705 8.29326C19.7753 8.18857 18.7721 8.18588 17.7763 8.28525C17.5118 8.31699 17.2544 8.39272 17.0148 8.50932C16.2346 8.86275 16.2252 8.98145 16.8134 9.6003C17.6173 10.417 18.0896 11.5029 18.1391 12.6478C18.1631 13.1813 18.0831 13.7228 18.1604 14.2483C18.2938 15.1192 17.8804 15.502 17.1255 15.8194C13.5138 17.3372 9.95809 17.2718 6.41841 15.5967C5.99562 15.3966 5.81423 15.1446 5.84758 14.6738C5.88492 14.1403 5.86225 13.6068 5.84758 13.0733C5.82357 11.6062 6.32638 10.3685 7.41603 9.39891C7.7788 9.07615 7.66143 8.93211 7.35468 8.71604C6.34505 8.00384 3.08679 8.01985 2.08917 8.75206C1.18891 9.41758 0.667427 10.9834 0.971514 12.0557C1.04087 12.2957 1.23826 12.3438 1.40764 12.4211C2.0365 12.7034 2.7011 12.8982 3.38287 12.9999C3.69763 13.0466 3.96704 13.1827 3.92303 13.5454C3.87368 13.9455 3.56026 13.9962 3.21749 13.9455C2.19586 13.7948 1.24493 13.4307 0.321995 12.9826C0.237409 12.9512 0.163762 12.896 0.110012 12.8235C0.0562626 12.751 0.0247269 12.6645 0.0192411 12.5745C0.0312446 11.5369 -0.132802 10.4859 0.321995 9.48693C0.691358 8.64329 1.36045 7.96659 2.19987 7.58772C2.46661 7.46369 2.59998 7.397 2.35724 7.08358C1.46365 5.95525 1.34629 4.72423 2.0905 3.48255C2.73602 2.40624 3.75364 1.86341 5.00734 1.99145C6.48909 2.14216 7.41869 3.02108 7.81881 4.45482C7.83615 4.51751 7.86949 4.57619 7.92817 4.73357ZM12.004 9.12816C11.4705 9.12816 10.937 9.10949 10.4035 9.12816C9.46236 9.17333 8.57244 9.57026 7.91 10.2404C7.24755 10.9105 6.86087 11.8049 6.82652 12.7465C6.81185 13.1907 6.85587 13.6388 6.80785 14.0802C6.75184 14.5937 6.98124 14.8285 7.4307 15.0138C10.3155 16.1902 13.215 16.2542 16.1385 15.1819C17.1935 14.7938 17.1895 14.7818 17.1882 13.6868C17.1882 13.376 17.1882 13.0653 17.1802 12.7532C17.1465 11.8112 16.7604 10.9161 16.0981 10.2453C15.4359 9.57442 14.546 9.17669 13.6045 9.13083C13.071 9.10816 12.5375 9.12816 12.004 9.12816ZM15.0542 5.08034C15.0494 4.27102 14.7234 3.49674 14.1477 2.92784C13.5721 2.35895 12.794 2.04203 11.9847 2.0468C11.1753 2.05158 10.4011 2.37766 9.83218 2.95331C9.26328 3.52896 8.94636 4.30703 8.95113 5.11635C8.9618 6.76082 10.3862 8.17456 12.0213 8.16122C13.6565 8.14788 15.0716 6.72481 15.0542 5.08034ZM4.7766 7.25163C5.34942 7.24389 5.89579 7.00926 6.29584 6.59921C6.69589 6.18916 6.91696 5.63717 6.91055 5.06433C6.89054 3.89333 5.87692 2.89838 4.71659 2.91972C3.55625 2.94106 2.5493 3.97469 2.5693 5.12435C2.5867 5.6969 2.82734 6.23995 3.23979 6.63745C3.65224 7.03495 4.2038 7.25537 4.7766 7.25163ZM19.2541 7.25163C19.8266 7.24792 20.375 7.02084 20.7826 6.61877C21.1901 6.2167 21.4246 5.6714 21.436 5.09901C21.4216 4.52669 21.1886 3.98161 20.7847 3.5758C20.3809 3.16999 19.837 2.93426 19.2648 2.91705C18.6913 2.92769 18.1444 3.1606 17.7393 3.56666C17.3343 3.97271 17.1027 4.5202 17.0935 5.09367C17.0949 5.66615 17.323 6.21476 17.7279 6.61943C18.1329 7.02411 18.6816 7.2519 19.2541 7.25296V7.25163ZM9.46995 8.2039C8.62479 7.46799 8.08493 6.44297 7.95618 5.32974C7.80947 5.76853 7.75346 6.03394 7.63609 6.26334C7.4427 6.64879 6.96923 7.09025 7.05726 7.37033C7.15462 7.68775 7.80014 7.79578 8.10022 8.09987C8.51901 8.52799 8.90312 8.58934 9.46995 8.2039ZM14.474 8.27725C14.9529 8.33727 15.2423 8.71204 15.601 8.35194C15.9425 8.00259 16.3507 7.72547 16.8014 7.53704C17.0001 7.45568 17.1201 7.36099 16.9227 7.1596C16.468 6.6968 16.2852 6.09263 16.0345 5.33107C15.8878 6.58343 15.3476 7.45568 14.4727 8.27725H14.474Z" fill="currentColor" stroke="currentColor" stroke-width="0.3"/>
                    </svg>
                </span>
                <div class="input-group">
                    <label>프로젝트 인원</label>
                    <div class="people-range">
                        <div class="select-wrapper select-wrapper-small">
                            <select v-model="minPeople" @focus="hidePlaceholder = true" @blur="hidePlaceholder = false" class="select-drop">
                                <option value="" disabled :hidden="hidePlaceholder">최소</option>
                                <option v-for="n in 10" :key="n" :value="n">{{ n === 10 ? '10명 이상' : n + '명' }}</option>
                            </select>
                        </div>
                        <span class="range-separator">~</span>
                        <div class="select-wrapper select-wrapper-small">
                            <select v-model="maxPeople" :disabled="!minPeople" @focus="hidePlaceholder = true" @blur="hidePlaceholder = false" class="select-drop">
                                <option value="" disabled :hidden="hidePlaceholder">최대</option>
                                <option v-for="n in maxPeopleOptions" :key="n" :value="n">{{ n === 10 ? '10명 이상' : n + '명' }}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="divider"></div>
            
            <div class="form-group">
                <span class="icon">
                    <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.9784 24.4971H1.93269C1.78984 24.5025 1.64681 24.5003 1.50421 24.4905C1.28884 24.4734 1.08786 24.3757 0.94149 24.2168C0.795124 24.0579 0.714175 23.8495 0.714848 23.6335C0.716069 23.4167 0.800393 23.2087 0.950442 23.0523C1.10049 22.8959 1.30483 22.803 1.52135 22.7927C1.98089 22.767 2.44151 22.767 2.90105 22.7927C3.2267 22.8118 3.29811 22.687 3.28859 22.388C3.24289 20.9084 3.32763 19.4449 3.83134 18.0309C4.53214 16.0627 5.7357 14.5411 7.67529 13.6737C8.19042 13.4442 8.48655 13.05 8.48179 12.493C8.47703 11.936 8.17042 11.556 7.65815 11.3218C5.21581 10.1992 4.00178 8.16437 3.47998 5.62871C3.28288 4.67653 3.26193 3.70721 3.30002 2.74074C3.31525 2.34368 3.24003 2.14658 2.79346 2.21324C2.5297 2.25227 2.25548 2.2199 1.98506 2.2199C1.13571 2.21609 0.710087 1.93044 0.718657 1.34961C0.727226 0.768777 1.13952 0.502167 1.95649 0.502167H20.0413C20.1841 0.502167 20.3269 0.494549 20.4688 0.50788C20.6855 0.519753 20.8899 0.612717 21.0412 0.768305C21.1926 0.923893 21.2799 1.13072 21.2858 1.3477C21.2882 1.45953 21.2685 1.57073 21.2278 1.67494C21.1872 1.77914 21.1264 1.8743 21.0489 1.95497C20.9714 2.03564 20.8788 2.10023 20.7763 2.14503C20.6738 2.18984 20.5635 2.21399 20.4517 2.21609C20.0077 2.24231 19.5626 2.24231 19.1186 2.21609C18.7711 2.19229 18.6968 2.32369 18.7073 2.64648C18.753 4.10903 18.6654 5.55634 18.1712 6.957C17.4694 8.9442 16.2601 10.4801 14.2987 11.3475C13.8007 11.5684 13.5188 11.9588 13.5141 12.4901C13.5141 13.0462 13.8045 13.4366 14.3187 13.6727C16.7943 14.8153 18.0236 16.8673 18.533 19.4487C18.7234 20.3894 18.7377 21.3387 18.7044 22.29C18.6911 22.6708 18.773 22.846 19.1881 22.7918C19.4572 22.7724 19.7272 22.7702 19.9965 22.7851C20.8601 22.7851 21.2734 23.0574 21.281 23.6316C21.2886 24.2058 20.8678 24.4971 20.0203 24.4971H10.9784ZM11.007 2.21609C9.15022 2.21609 7.29347 2.22657 5.43766 2.20752C5.07679 2.20752 4.98062 2.30274 4.9949 2.65695C5.02251 3.38537 4.97871 4.11665 5.09012 4.84125C5.431 7.05984 6.35652 8.86041 8.52749 9.84116C9.64059 10.3439 10.2043 11.2989 10.2005 12.5073C10.2005 13.7556 9.58441 14.6973 8.43323 15.2105C7.14683 15.7818 6.27177 16.734 5.6938 17.9861C5.02727 19.4382 4.96729 20.9855 4.99966 22.5471C4.99966 22.787 5.13678 22.7851 5.30626 22.7851C9.09912 22.7851 12.8913 22.7851 16.6829 22.7851C16.9362 22.7851 17.0076 22.7061 17.0029 22.4595C16.9895 21.6825 17.0295 20.9036 16.9076 20.1323C16.5629 17.9337 15.645 16.1389 13.495 15.1658C12.3791 14.6601 11.8059 13.7213 11.8001 12.5158C11.7944 11.2913 12.3714 10.3391 13.5064 9.82687C14.8005 9.24414 15.7079 8.30338 16.2963 7.03508C16.9467 5.63061 17.0248 4.13474 17.0076 2.61982C17.0029 2.27322 16.8953 2.20562 16.5744 2.20847C14.7157 2.22752 12.8628 2.21609 11.007 2.21609Z" fill="#020725"/>
                        <path d="M10.9943 21.9262C9.63075 21.9262 8.26723 21.9262 6.90466 21.9262C6.15149 21.9262 5.83822 21.5939 5.85726 20.8407C5.93439 18.2774 8.05966 16.1007 10.6458 15.936C13.3052 15.7665 15.679 17.6499 16.0646 20.2399C16.0789 20.3351 16.0999 20.4303 16.1122 20.5255C16.2475 21.5643 15.9285 21.9319 14.8906 21.9319L10.9943 21.9262Z" fill="#020725"/>
                        <path d="M11.054 5.64392C11.8624 5.64392 12.6727 5.64392 13.4782 5.64392C14.1752 5.64868 14.4914 6.00861 14.418 6.69799C14.3539 7.3349 14.0605 7.9268 13.5925 8.36349C13.1244 8.80018 12.5136 9.0519 11.8738 9.07177C11.2892 9.09082 10.7017 9.09177 10.1161 9.07177C9.48517 9.05014 8.88297 8.80276 8.41902 8.37464C7.95508 7.94652 7.66021 7.36609 7.58806 6.73893C7.49855 6.02479 7.81467 5.65154 8.53548 5.64392C9.3753 5.64392 10.2151 5.64392 11.054 5.64392Z" fill="currentColor"/>
                    </svg>
                </span>
                <div class="input-group">
                    <label>프로젝트 기간</label>
                    <div class="duration-range">
                        <div class="select-wrapper select-wrapper-small">
                            <select v-model="minDuration" @focus="hidePlaceholder = true" @blur="hidePlaceholder = false" class="select-drop">
                                <option value="" disabled :hidden="hidePlaceholder">최소</option>
                                <option v-for="duration in durationOptions" :key="duration.value" :value="duration.value">{{ duration.label }}</option>
                            </select>
                        </div>
                        <span class="range-separator">~</span>
                        <div class="select-wrapper select-wrapper-small">
                            <select v-model="maxDuration" :disabled="!minDuration" @focus="hidePlaceholder = true" @blur="hidePlaceholder = false" class="select-drop">
                                <option value="" disabled :hidden="hidePlaceholder">최대</option>
                                <option v-for="duration in maxDurationOptions" :key="duration.value" :value="duration.value">
                                    {{ duration.label }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>  
    
            <div class="divider"></div>
            
            <div class="form-group">
                <!-- 아이콘 -->
                <span class="icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3 9H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9 21V9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
            <div class="input-group">
                <label>상위 카테고리</label>
                <div class="select-wrapper select-wrapper-large">
                    <select v-model="category" @focus="hidePlaceholder = true" @blur="hidePlaceholder = false">
                        <option value="" disabled :hidden="hidePlaceholder">Select Category</option>
                            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                    </select>
                </div>
            </div>
        </div>
        
        <div class="divider"></div>  
        
        <div class="form-group">
            <span class="icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M3 9H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9 21V9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </span>
            <div class="input-group">
                <label>하위 카테고리</label>
                <div class="select-wrapper select-wrapper-large">
                    <select v-model="subcategory" :disabled="!category" @focus="hidePlaceholder = true" @blur="hidePlaceholder = false">
                        <option value="" disabled :hidden="hidePlaceholder">{{subcategoryPlaceholder}}</option>
                        <option v-for="subcat in subcategories" :key="subcat" :value="subcat">{{ subcat }}</option>
                    </select>
                </div>
            </div>
        </div>
        
        <button class="search-button" @click="searchMatching">
            <span class="icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M21 21L16.65 16.65" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </span>
        </button>

    </div>
    <div v-if="activeTab === 'private'" class="search-form">
        <div class="form-group">
            <div class="invite">
                <label>입장 코드</label>
                <div class="invite-input">
                    <input ref="inviteInput" type="text" placeholder="입장 코드를 입력하세요">
                </div>
                <button class="invite-button">입장하기</button>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import MatchingCreate from './MatchingCreate.vue'

const router = useRouter()
const activeTab = ref('random')
const minPeople = ref('')
const maxPeople = ref('')
const minDuration = ref('')
const maxDuration = ref('')
const category = ref('')
const subcategory = ref('')
const hidePlaceholder = ref(false)
const inviteInput = ref(null)
const subcategoryPlaceholder = ref('Select Category')
const showModal = ref(false)

// 읽어오기
const categories = ['개발', '디자인', '기획', '마케팅']
const subcategoriesMap = {
    '개발': ['웹', '모바일', '백엔드', '프론트엔드'],
    '디자인': ['UI/UX', '그래픽', '브랜딩'],
    '기획': ['서비스 기획', '전략 기획', 'PM'],
    '마케팅': ['디지털 마케팅', '콘텐츠 마케팅', '브랜드 마케팅']
}
const durationOptions = [
    { value: '1w', label: '1주' },
    { value: '2w', label: '2주' },
    { value: '1m', label: '1개월' },
    { value: '2m', label: '2개월' },
    { value: '3m', label: '3개월' },
    { value: '6m', label: '6개월' }
]

const subcategories = computed(() => {
    return category.value ? subcategoriesMap[category.value] : []
})

const maxPeopleOptions = computed(() => {
    return minPeople.value ? Array.from({ length: 10 - minPeople.value + 1 }, (_, i) => i + Number(minPeople.value)) : []
})

const maxDurationOptions = computed(() => {
    if (!minDuration.value) return []
    const currentIndex = durationOptions.findIndex(d => d.value === minDuration.value)
    return durationOptions.slice(currentIndex)
})

const setActiveTab = (tab) => {
    activeTab.value = tab
    if (tab === 'private') {
        nextTick(() => {
            inviteInput.value.focus()
        })
    }
}
// Watch for changes in category to reset subcategory and update placeholder
    watch(category, (newValue) => {
        if (newValue) {
            subcategory.value = ''
            subcategoryPlaceholder.value = 'Select Category'
        }
    })
    watch(activeTab, (newValue) => {
        if(newValue) {
            const activeTab = ref('random')
            minPeople.value = ''
            maxPeople.value = ''
            minDuration.value = ''
            maxDuration.value = ''
            category.value = ''
            subcategory.value = ''
            hidePlaceholder.value = false
            inviteInput.value = null
            subcategoryPlaceholder.value = 'Select Category'
        }
    })

    const searchMatching = () => {
        router.push('/match/result')
    }
    // 이부분에 api 요청 구현
    // const searchMatching = async () => {
    // if (activeTab.value === 'random') {
    //     // Create search parameters object
    //     const searchParams = {
    //         minPeople: minPeople.value,
    //         maxPeople: maxPeople.value,
    //         minDuration: minDuration.value,
    //         maxDuration: maxDuration.value,
    //         category: category.value,
    //         subcategory: subcategory.value
    //     }

    //     // Convert to query string, including null values
    //     const queryString = Object.entries(searchParams)
    //         .map(([key, value]) => `${key}=${value === null ? 'null' : value}`)
    //         .join('&')

    //     // Navigate to result page with search parameters
    //     router.push(`/match/result?${queryString}`)
    // }
//}

const createMatching = () => {
    showModal.value = !showModal.value;
  }
</script>

<style scoped>
    .search-container {
        padding: 20px;
        border-radius: 12px;
        max-width: fit-content;
        min-width: fit-content;
        margin: 0 auto;
        flex-direction: column;
        background-color: rgba(255, 255, 255, 0.7);
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    .tab-group {
        display: flex;
        gap: 0;
    }

    label {
        font-family: 'Open Sans', sans-serif;
        font-weight: 600;
        font-size: 18px;
        color: #020725;
    }

    .tab-button {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 16px;
        background: rgba(111, 111, 111, 0.3);
        border: none;
        cursor: pointer;
        font-family: 'Open Sans', sans-serif;
        font-weight: 600;
        font-size: 18px;
        color: rgba(255, 255, 255, 0.7);
    }
    
    .tab-button:first-child {
        border-radius: 12px 0 0 0;
    }
    
    .tab-button:last-child {
        border-radius: 0 12px 0 0;
    }
    
    .tab-button:hover {
        background: rgba(255, 255, 255, 0.8);
        color: #020725;
    }
    
    .tab-button.active {
        background: #fff;
        color: #020725;
    }
    
    .search-form {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        background: #ffffff;
        border-radius: 0 12px 12px 12px;
        box-shadow: 0 2px 8px rgba(2, 7, 37, 0.05);
        min-width: 1260px;
        min-height: 120px;
    }
    
    .form-group {
        display: flex;
        gap: 7px;
        padding: 16px;
        background: white;
        border-radius: 8px;
        white-space: nowrap;
        margin: 0;
    }
    
    .input-group {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
    
    .invite {
        display: flex;
        gap: 20px;
    }

    .invite-input {
        font-size: 18px;
        border: 2px solid #5d8ac1;
        border-radius: 8px;
        min-width: 1000px;
        padding: 1px;
        padding-left: 10px;
        display: inline-block
    }

    .invite-input input {
        border: none;
        outline: none;
    }
    
    .divider {
        width: 1px;
        height: 40px;
        background: rgba(2, 7, 37, 0.1);
    }
    
    .select-wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }
    
    .select-wrapper-small {
        min-width: 100px;
        width: 100px;
    }
    
    .select-wrapper-large {
        min-width: 180px;
        width: 180px;
    }
    
    .select-wrapper::after {
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 24px;
        height: 24px;
        background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%23020725' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: center;
        pointer-events: none;
        opacity: 0.6;
    }
    
    select {
        width: 100%;
        font-family: 'Open Sans', sans-serif;
        font-size: 18px;
        color: rgba(2, 7, 37, 0.8);
        border: none;
        background: transparent;
        padding-right: 24px;
        padding-left: 3px;
        cursor: pointer;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
    }
    
    select::-ms-expand {
        display: none;
    }
    
    .chevron-down {
        display: none;
    }
    
    .search-button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        background: #133E86;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    
    .search-button:hover {
        background: #1a4ca8;
    }
    
    .create-project-button {
        padding: 8px 16px;
        background: rgba(93, 138, 193, 0.7);
        border: none;
        border-radius: 8px;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        font-size: 14px;
        color: #fff;
        cursor: pointer;
        transition: background-color 0.3s ease;
        margin-top: 8px;
        margin-right: 8px;
    }
    
    .create-project-button:hover {
        background: rgba(93, 138, 193, 0.85);
    }

    .invite-button {
        padding-left: 12px;
        padding-right: 12px;
        background: #133E86;
        border: none;
        border-radius: 8px;
        font-family: sans-serif;
        font-weight: 500;
        font-size: 18px;
        color: #fff;
    }
    
    .icon {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .people-range,
    .duration-range {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .range-separator {
        color: #020725;
        font-size: 18px;
        font-weight: 600;
    }
    
    select:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style> 