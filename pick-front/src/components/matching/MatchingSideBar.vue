<template>
    <div class="search-container">
      <div class="tab-container">
        <div class="tab active">
          <div class="icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#5D8AC1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#5D8AC1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span>Random Matching</span>
        </div>
        <div class="tab">
          <div class="icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#020725" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#020725" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span>Private Matching</span>
        </div>
      </div>
      
      <div class="search-form">
        <div class="form-group">
          <div class="icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#020725" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#020725" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="select-wrapper">
            <label>최대 인원</label>
            <div class="select-container">
              <span class="placeholder">Choose Number</span>
              <div class="chevron-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="#020725" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <div class="icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#020725" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 6V12L16 14" stroke="#020725" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="select-wrapper">
            <label>프로젝트 기간</label>
            <div class="select-container">
              <span class="placeholder">Choose Duration</span>
              <div class="chevron-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="#020725" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div class="form-group category-group">
          <div class="select-wrapper-small">
            <label>상위 카테고리</label>
            <div class="select-container">
              <span class="placeholder">Select Category</span>
              <div class="chevron-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="#020725" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div class="select-wrapper-small">
            <label>하위 카테고리</label>
            <div class="select-container">
              <span class="placeholder">Select Category</span>
              <div class="chevron-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="#020725" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div class="button-group">
          <button class="search-button">매칭 조회</button>
          <button class="reset-button">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 3C14.5013 3 16.8917 3.99246 18.7456 5.74642C20.5995 7.50038 21.5 9.89079 21.5 12.3921C21.5 14.8934 20.5995 17.2838 18.7456 19.0378C16.8917 20.7917 14.5013 21.7842 12 21.7842C9.49872 21.7842 7.10832 20.7917 5.25442 19.0378C3.40052 17.2838 2.5 14.8934 2.5 12.3921C2.5 9.89079 3.40052 7.50038 5.25442 5.74642C7.10832 3.99246 9.49872 3 12 3Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 7V12L15 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Component logic can be added here
  </script>
  
  <style scoped>
  .search-container {
    width: 440px;
    min-width: 440px;
    border: 1px solid #020725;
    border-radius: 12px;
    overflow: hidden;
    background-color: #fff;
  }
  
  .tab-container {
    display: flex;
    height: 80px;
  }
  
  .tab {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 16px;
    width: 220px;
    height: 80px;
    background-color: rgba(217, 217, 217, 0.4);
    cursor: pointer;
  }
  
  .tab.active {
    background-color: #fff;
  }
  
  .tab.active .icon-wrapper svg path {
    stroke: #5D8AC1;
  }
  
  .tab.active span {
    color: #5D8AC1;
  }
  
  .tab:not(.active) .icon-wrapper svg path {
    stroke: #020725;
  }
  
  .tab:not(.active) span {
    color: #020725;
  }
  
  .icon-wrapper {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .icon-wrapper svg {
    width: 100%;
    height: 100%;
  }
  
  .tab span {
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
    font-size: 18px;
    line-height: 1.36;
  }
  
  .search-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    padding: 12px;
    width: 440px;
    min-width: fit-content;
  }
  
  .form-group {
    display: flex;
    gap: 7px;
    padding: 16px;
    width: 410px;
    white-space: nowrap;
  }
  
  .category-group {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 2px 1px;
    width: 410px;
  }
  
  .select-wrapper {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
  }
  
  .select-wrapper-small {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
  }
  
  .select-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    border: 1px solid #020725;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .placeholder {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 18px;
    line-height: 1.36;
    color: #020725;
    opacity: 0.8;
  }
  
  .chevron-icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.6;
  }
  
  .chevron-icon svg {
    width: 100%;
    height: 100%;
  }
  
  label {
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
    font-size: 18px;
    line-height: 1.36;
    color: #020725;
  }
  
  .button-group {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 10px 17px;
    width: 410px;
  }
  
  .search-button {
    width: 300px;
    padding: 12px 24px;
    background-color: #133E86;
    border: none;
    border-radius: 12px;
    color: #fff;
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
    font-size: 20px;
    line-height: 1.36;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .search-button:hover {
    background-color: #1a4ca8;
  }
  
  .reset-button {
    width: 51px;
    height: 51px;
    padding: 6px;
    background-color: #133E86;
    border: none;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .reset-button:hover {
    background-color: #1a4ca8;
  }
  
  .reset-button svg {
    width: 100%;
    height: 100%;
  }
  </style> 