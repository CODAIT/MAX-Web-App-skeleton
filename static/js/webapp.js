/*
 * Copyright 2018 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-env jquery */
/* eslint-env browser */

'use strict';

// Run or bind functions on page load
$(function() {

  // File upload form submit functionality
  $('#file-upload').on('submit', function(event) {
    // Stop form from submitting normally
    event.preventDefault();

    // Get form data
    var form = event.target;
    var data = new FormData(form);

    if ($('#file-input').val() !== '') {
      // Disable submit button and change button text for clarity
      $('#file-submit').text('Predicting...');
      $('#file-submit').prop('disabled', true);

      // Perform file upload
      $.ajax({
        url: '/model/predict',
        method: 'post',
        processData: false,
        contentType: false,
        data: data,
        dataType: 'json',
        success: function(data) {
          // Dump json output to page, this should be replaced or removed
          var output = JSON.stringify(data, null, 2);
          $('#json-output').html(output);
        },
        error: function(jqXHR, status, error) {
          alert('Prediction Failed: ' + error);
        },
        complete: function() {
          // Restore submit button functionality
          $('#file-submit').text('Submit');
          $('#file-input').val('');
          $('#file-submit').prop('disabled', false);
        },
      });
    }
  });

});
