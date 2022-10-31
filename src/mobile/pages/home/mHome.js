import React from 'react';
import { MobileNavbar, SubMobileNavbar, MobileFooter } from 'mobile/components'
function MHome() {
    return (
        <div>
            <MobileNavbar />
            <SubMobileNavbar />
            <>content</>
            <MobileFooter />
        </div>
    );
};
export default MHome;