Table 1 - Slot
col - id, name, image

base_url : localhost/abcd/api


api 1: Create a new slot 
POST: api/table/create.php 
PARAMS: name, image (optional)
RETURN: slot_id

automatically create 2 `Text` (Table 4) row with this slot id. 1 row with phase 1 value, another with 2 value. 
Default text for phase 1 : "Scegli il Jazz Club
e scopri il numero di giri gratuiti"
Default text for phase 2 : "Scegli il Jazz Club
e scopri il numero di giri gratuiti"


api 2: List of all slots in json 
GET: api/table/index.php 
RETURN: JSON Array [{slot 1..},{slot 2..}]

##Objects
Background - Phase 1, Phase 2, Phase 3
Elements - Phase 1, 2, 3.... 
Text - Phase 1, 2, 3.. 




Table 2: Background 
Cols - id, slot_id (table 1 id), phase_no (1/2/3), link (string), posX, posY, width, height

API 3: Background upload
POST: background/create
params - slot_id, phase_no, files[] - (png/jpg) or (json+atlas+png:json path will be saved at link) , posX, posY, width, height 

API 4: Backgroud update
POST: background/update_param
param- slot_id, phase_no, posX/posY/width/height

API 5: Background file update
POST: background/update_files
params - slot_id, phase_no, files[] 


Table 3: Elements
Cols - id, slot_id (table 1 id), phase_no (1/2/3), link (string), posX, posY, scale, animation, time 

API 6: Elements upload
POST: element/create
params - slot_id, phase_no, files[] - (json+atlas+png:json path will be saved at link) , posX, posY, scale, animation, time 
RETURN - element id, message

API 7: Elements update
POST: element/update_param
param- element_id, posX/posY/scale/animation/time 

API 8: Elements delete
POST: element/delete
params - element_id


Table 4: Text 
Cols - id, slot_id (table 1 id), phase_no (1/2/3), text, posX, posY, 

API 9: Text update
text/update_param
param- slot_id, phase_no, posX/posY/text


Table 5: Button 
Cols - id, slot_id (table 1 id), link_normal, link_hover,link_click, text, posX, posY, 

API 10: Button upload
POST: button/create 
params - slot_id, file_normal, file_hover, file_click - ( files will be uploaded and path will be saved at link) , text, posX, posY,

API 11: Button update
POST: button/update_param
param- slot_id, text, posX, posY,

API 12: Button update files 
POST: button/update_files 
param- slot_id, file_normal, file_hover, file_click


API 20: 
GET: give_all? id=(Table 1 id) & phase= (1/2/3) 
Return: JSON OBJECT {
    Background : {
       .... 
    },
    Elements: [

    ],
    Text: {
        ...
    },
    Button: {
        ...
    }
}


