import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://xittxzcldazfdsudwflp.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjkxOTQ1NDAzLTc4OGYtNGY0ZC05ODg3LTIxNmUyODc1YjkwYiJ9.eyJwcm9qZWN0SWQiOiJ4aXR0eHpjbGRhemZkc3Vkd2ZscCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzcwODEyNDUxLCJleHAiOjIwODYxNzI0NTEsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.RmsKy4PIFkVSbmHICc43G003pzlEP_RT_uJ9phyxriE';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };