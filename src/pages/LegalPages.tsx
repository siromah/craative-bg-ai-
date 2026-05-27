import React from 'react';
import { Card, CardBody } from '../components/ui/Card';

const LegalLayout = ({ title, children }: any) => (
  <div className="min-h-screen bg-bg-subtle px-4 py-20">
    <div className="max-w-3xl mx-auto">
      <Card className="bg-bg shadow-sm">
        <CardBody className="p-8 md:p-12">
          <h1 className="text-[32px] md:text-[40px] font-semibold text-ink-900 tracking-tight leading-tight mb-8">
            {title}
          </h1>
          <div className="text-[15px] leading-relaxed text-text-secondary space-y-6">
            <div className="bg-amber-light border border-amber/20 px-5 py-4 rounded-xl text-[14px] text-amber-900 mb-8">
              <strong>Disclaimer:</strong> This content is a technical prototype and does not represent an official legal document. It must be reviewed by legal counsel before public launch.
            </div>
            {children}
          </div>
        </CardBody>
      </Card>
    </div>
  </div>
);

export const PrivacyPolicy = () => (
  <LegalLayout title="Privacy Policy">
    <p>Last Updated: {new Date().toLocaleDateString()}</p>
    
    <h3 className="text-[18px] font-semibold text-ink-900 mt-10 mb-3">1. Who are we?</h3>
    <p>This site is managed by AILABSBG and serves as a conceptual platform. This policy explains how we collect and use your data when using our services.</p>

    <h3 className="text-[18px] font-semibold text-ink-900 mt-10 mb-3">2. Data we collect</h3>
    <ul className="list-disc pl-5 space-y-2">
      <li><strong>Profile Data:</strong> Names, email address, and professional role upon registration (using Supabase/Firebase Auth or similar).</li>
      <li><strong>Content:</strong> Posts, comments, and saved prompts within your user session.</li>
      <li><strong>Technical Data:</strong> IP address, cookies, and analytical information only if explicit consent is given.</li>
    </ul>

    <h3 className="text-[18px] font-semibold text-ink-900 mt-10 mb-3">3. Purpose of processing</h3>
    <p>We use your data to:</p>
    <ul className="list-disc pl-5 space-y-2">
      <li>Ensure the functioning of the platform (e.g., user login).</li>
      <li>Improve learning materials and the community through aggregated statistics.</li>
      <li>Send you important system notifications.</li>
    </ul>

    <h3 className="text-[18px] font-semibold text-ink-900 mt-10 mb-3">4. Your GDPR Rights</h3>
    <p>Under Regulation (EU) 2016/679 (GDPR), you have the right to access, rectify, erase, and port your data. You may withdraw your consent at any time.</p>

    <h3 className="text-[18px] font-semibold text-ink-900 mt-10 mb-3">5. Contact us</h3>
    <p>For inquiries regarding privacy, please contact us at: <a href="mailto:privacy@ailabsbg.demo" className="text-accent hover:underline font-medium">privacy@ailabsbg.demo</a></p>
  </LegalLayout>
);

export const CookiePolicy = () => (
  <LegalLayout title="Cookie Policy">
    <p>Last Updated: {new Date().toLocaleDateString()}</p>
    
    <h3 className="text-[18px] font-semibold text-ink-900 mt-10 mb-3">1. What are cookies?</h3>
    <p>Cookies are small text files that are saved on your device when you visit a website. We use cookies and local storage (localStorage) to ensure the seamless operation of the platform.</p>

    <h3 className="text-[18px] font-semibold text-ink-900 mt-10 mb-3">2. Types of cookies we use</h3>
    <ul className="list-disc pl-5 space-y-2">
      <li><strong>Strictly Necessary:</strong> Mandatory for the site to work (e.g., saving login state, themes). Cannot be disabled.</li>
      <li><strong>Analytical (Optional):</strong> Helps us understand how visitors interact with the site (e.g., number of visits, most viewed courses).</li>
      <li><strong>Marketing (Optional):</strong> Used to track across different sites to show relevant ads.</li>
    </ul>

    <h3 className="text-[18px] font-semibold text-ink-900 mt-10 mb-3">3. Managing preferences</h3>
    <p>You can change your cookie settings at any time using the "Cookie Settings" button.</p>
  </LegalLayout>
);

export const TermsOfUse = () => (
  <LegalLayout title="Terms of Use">
    <p>Last Updated: {new Date().toLocaleDateString()}</p>

    <h3 className="text-[18px] font-semibold text-ink-900 mt-10 mb-3">1. Acceptance of Terms</h3>
    <p>By accessing and using AILABSBG, you agree to be bound by these Terms of Use. This is a platform for learning and professional community building.</p>

    <h3 className="text-[18px] font-semibold text-ink-900 mt-10 mb-3">2. User Accounts and Content</h3>
    <ul className="list-disc pl-5 space-y-2">
      <li>You are responsible for maintaining the confidentiality of your password.</li>
      <li>The content you share in the "Community" section must not violate the law, copyrights, or offend other users.</li>
    </ul>

    <h3 className="text-[18px] font-semibold text-ink-900 mt-10 mb-3">3. Intellectual Property</h3>
    <p>All learning content, texts, designs, and graphics on the platform are owned by AILABSBG, unless otherwise noted. User prompts remain the property of their creators but are displayed within the platform.</p>

    <h3 className="text-[18px] font-semibold text-ink-900 mt-10 mb-3">4. Limitation of Liability</h3>
    <p>The platform and AI integrations are provided "as is". We are not responsible for damages arising from the use or inability to use the materials. AI-generated content must be verified as we do not guarantee its accuracy.</p>
  </LegalLayout>
);

