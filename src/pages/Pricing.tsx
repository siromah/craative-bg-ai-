import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { PRICING_PLANS } from '../data';
import { Button } from '../components/ui/Button';
import { Card, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export default function Pricing({ currentUser, openModal, showToast }: any) {
  const [yearly, setYearly] = useState(false);

  const handleCta = (planId: string) => {
    if (!currentUser) {
      openModal('register');
      return;
    }
    if (planId === 'starter') {
      showToast('You are already on the Starter plan');
      return;
    }
    showToast(`Selected ${planId} plan — checkout coming soon`);
  };

  return (
    <div className="min-h-screen warm-gradient text-text-primary px-4 md:px-6 py-12 md:py-20">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-5 mb-14">
          <Badge variant="accent" className="rounded-full">Pricing</Badge>
          <h1 className="text-[40px] md:text-[56px] font-semibold text-ink-900 tracking-tight leading-tight">
            Simple, transparent pricing
          </h1>
          <p className="text-[18px] md:text-[20px] text-text-secondary max-w-xl leading-relaxed">
            Choose a plan that fits your workflow. All prices in euros. No hidden fees.
          </p>

          <div className="flex items-center gap-3 mt-6 bg-bg border border-border/50 rounded-full p-1">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-full text-[14px] font-medium transition-colors ${!yearly ? 'bg-ink-900 text-white' : 'text-text-secondary hover:text-text-primary'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-full text-[14px] font-medium transition-colors ${yearly ? 'bg-ink-900 text-white' : 'text-text-secondary hover:text-text-primary'}`}
            >
              Yearly
            </button>
          </div>
          {yearly && <p className="text-[13px] text-emerald font-medium">Save up to 2 months with yearly billing</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRICING_PLANS.map((plan, idx) => {
            const isPro = plan.id === 'pro';
            const price = yearly ? plan.yearly : plan.monthly;
            const period = yearly ? '/year' : '/month';
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className={`h-full flex flex-col ${isPro ? 'border-accent/30 ring-1 ring-accent/10' : ''}`}>
                  <CardBody className="p-7 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <h3 className="text-[18px] font-semibold text-ink-900">{plan.name}</h3>
                      {isPro && <Badge variant="accent" className="rounded-full">Popular</Badge>}
                    </div>
                    <p className="text-[14px] text-text-secondary mb-6">{plan.desc}</p>
                    <div className="mb-8">
                      <span className="text-[36px] font-bold text-ink-900 tracking-tight">
                        {price === 0 ? 'Free' : `€${price}`}
                      </span>
                      {price > 0 && <span className="text-[15px] text-text-tertiary ml-1">{period}</span>}
                    </div>
                    <ul className="flex flex-col gap-3 mb-8 flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-[14px] text-text-secondary">
                          <Check size={16} className="text-emerald mt-0.5 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={isPro ? 'primary' : 'secondary'}
                      className="w-full h-11 rounded-full"
                      onClick={() => handleCta(plan.id)}
                    >
                      {price === 0 ? 'Get Started' : 'Choose Plan'}
                    </Button>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-[14px] text-text-tertiary">
            Need a custom enterprise plan?{' '}
            <button onClick={() => openModal('contact')} className="text-accent font-medium hover:underline">
              Contact us
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
