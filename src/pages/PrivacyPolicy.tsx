
import React from 'react';
import Layout from '@/components/Layout';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';

const PrivacyPolicy: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{t('privacy.title')}</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-3">{t('privacy.section1.title')}</h2>
            <p className="text-muted-foreground">
              {t('privacy.section1.content')}
            </p>
          </section>
          
          <Separator />
          
          <section>
            <h2 className="text-xl font-semibold mb-3">{t('privacy.section2.title')}</h2>
            <p className="text-muted-foreground">
              {t('privacy.section2.content')}
            </p>
          </section>
          
          <Separator />
          
          <section>
            <h2 className="text-xl font-semibold mb-3">{t('privacy.section3.title')}</h2>
            <p className="text-muted-foreground mb-4">
              {t('privacy.section3.content')}
            </p>
            <h3 className="text-lg font-medium mb-2">{t('privacy.section3.what.title')}</h3>
            <p className="text-muted-foreground mb-4">
              {t('privacy.section3.what.content')}
            </p>
            <h3 className="text-lg font-medium mb-2">{t('privacy.section3.types.title')}</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>
                <strong>{t('privacy.section3.types.necessary')}</strong>
              </li>
              <li>
                <strong>{t('privacy.section3.types.functional')}</strong>
              </li>
              <li>
                <strong>{t('privacy.section3.types.analytical')}</strong>
              </li>
            </ul>
          </section>
          
          <Separator />
          
          <section>
            <h2 className="text-xl font-semibold mb-3">{t('privacy.section4.title')}</h2>
            <p className="text-muted-foreground mb-4">
              {t('privacy.section4.content1')}
            </p>
            <p className="text-muted-foreground">
              {t('privacy.section4.content2')}
            </p>
          </section>
          
          <Separator />
          
          <section>
            <h2 className="text-xl font-semibold mb-3">{t('privacy.section5.title')}</h2>
            <p className="text-muted-foreground">
              {t('privacy.section5.content')}
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
