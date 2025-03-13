<html>
    <head>
        <link rel="stylesheet" href="rotaryStylesheet.css">
        <title>AMB Rotary Exam</title>
    </head>
    
    <body>
        <div class="title">
            <h1>Rotary Exam</h1>
        </div>
    
        <form class="examForm" method="POST" action="/index.php">
    
            <div class="section">
                <label for="robloxName">Enter your roblox name (not display name)</label>
                <input type="text" id="robloxName">
            </div>
    
             <div class="section">
                <p style="margin: 0;">Select a time</p>
                <div class="customDateTime">
                    <p class="date">
                        <span id="dateDisplay">__/__/____ </span>
                        <span class="time" id="timeDisplay">__:__</span>
                        <span class="calendarIcon">
                             <span class="gridContainer">
                                <span class="gridItem top" style="grid-row-start: 1;"></span>
                                <span class="gridItem top" style="grid-row-start: 1;"></span>
                                <span class="gridItem top" style="grid-row-start: 1;"></span>
                                <span class="gridItem" style="grid-row-start: 2;"></span>
                                <span class="gridItem" style="grid-row-start: 2;"></span>
                                <span class="gridItem" style="grid-row-start: 2;"></span>
                                <span class="gridItem" style="grid-row-start: 3;"></span>
                                <span class="gridItem" style="grid-row-start: 3;"></span>
                            </span>
                        </span>
                    </p>
                </div>
            </div> 
    
            <div class="section">
                <p style="margin: 0;">Select a stage</p>
                <div class="customSelect" style="width:100px;">
                    <select>
                        <option value="0">None</option>
                        <option value="1">Stage 1</option>
                        <option value="2">Stage 2</option>
                        <option value="3">Both Stages</option>
                    </select>
                </div>
            </div>
    
            <div class="section">
                <label class="container">Use VC for the exam
                    <input type="checkbox" id="VC">
                    <span class="checkmark"></span>
                </label>
            </div>
    
            <div class="section">
                <input type="submit" value="Confirm" class="confirm">
            </div>
    
        </form>
    <script src="Scripts.js"></script>
    </body>
</html>
