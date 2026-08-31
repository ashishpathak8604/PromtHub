import React from 'react';
import PromptGrid from '../../components/prompt/PromptGrid';
import EmptyState from './EmptyState';

function ProfilePromptSection({ prompts = [], emptyProps = {} }) {
  return (
    <div>
      {prompts.length > 0 ? (
        <PromptGrid prompts={prompts} />
      ) : (
        <EmptyState {...emptyProps} />
      )}
    </div>
  );
}

export default ProfilePromptSection;
