import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeVideo({ videoPath }) {
  if (videoPath) {
    return (
      <div>
        <h4>Vídeo</h4>
        <iframe
          data-testid="video"
          width="400px"
          height="225px"
          src={ videoPath.replace('watch?v=', 'embed/') }
          title="YouTube video player"
        />
      </div>
    );
  }
  return null;
}

RecipeVideo.propTypes = {
  recipeData: PropTypes.object,
}.isRequired;
