# Demo Video Recording Guide

## 🎥 Recording Instructions

This guide provides step-by-step instructions for recording and editing the demo video for the Haunted Agents Marketplace hackathon submission.

---

## 📋 Pre-Recording Checklist

### 1. Technical Setup

**Screen Recording Software** (choose one):
- **OBS Studio** (Free, powerful) - https://obsproject.com/
- **Loom** (Easy, web-based) - https://loom.com/
- **ScreenFlow** (Mac, paid) - https://www.telestream.net/screenflow/
- **Camtasia** (Cross-platform, paid) - https://www.techsmith.com/video-editor.html

**Audio Setup**:
- Use a good quality microphone (USB mic or headset)
- Test audio levels before recording
- Record in a quiet environment
- Use noise cancellation if available

**Display Settings**:
- Set screen resolution to 1920x1080 (Full HD)
- Close unnecessary applications
- Disable notifications (Do Not Disturb mode)
- Use a clean desktop background
- Increase browser font size for readability

### 2. Browser Preparation

**Open and Pre-load Tabs**:
1. Tab 1: Kiro Agents Marketplace homepage
2. Tab 2: Kiro Agents Marketplace - React + Supabase Expert detail page
3. Tab 3: DevOps Automation Hub homepage
4. Tab 4: DevOps Automation Hub - Terraform Helper detail page
5. Tab 5: GitHub repository (optional)

**Browser Settings**:
- Zoom to 110-125% for better visibility
- Clear browser cache to ensure fresh load
- Disable browser extensions that might interfere
- Use incognito/private mode to avoid personal data

### 3. Terminal Preparation

**Prepare Commands**:
Create a text file with all commands ready to copy-paste:

```bash
# Install CLI
npm install -g @haunted-agents/cli

# Show help
kiro-agent --help

# Install agent
kiro-agent install react-supabase-expert

# List installed
kiro-agent list
```

**Terminal Settings**:
- Increase font size (18-20pt)
- Use a clean theme (light or dark with good contrast)
- Clear terminal history
- Set terminal size to fit screen nicely

### 4. Code Editor Preparation (if showing code)

**Files to Open**:
- `skeleton/web/src/components/AgentCard.tsx`
- `app1-kiro-marketplace/config/agents.json`
- `app2-devops-hub/config/agents.json`
- `app1-kiro-marketplace/config/branding.json`
- `app2-devops-hub/config/branding.json`

**Editor Settings**:
- Increase font size (16-18pt)
- Use a clean theme
- Collapse unnecessary code sections
- Highlight key lines if possible

---

## 🎬 Recording Process

### Step 1: Record in Segments

**Why segments?**
- Easier to fix mistakes
- Better quality control
- Allows for multiple takes
- Simpler editing process

**Recommended Segments**:
1. **Intro** (0:00 - 0:20)
2. **App 1 Demo** (0:20 - 1:00)
3. **App 2 Demo** (1:00 - 1:40)
4. **CLI Demo** (1:40 - 2:20)
5. **Skeleton Code** (2:20 - 2:50)
6. **Closing** (2:50 - 3:00)

### Step 2: Recording Each Segment

**For Each Segment**:

1. **Prepare**:
   - Review script for this segment
   - Open necessary tabs/windows
   - Position cursor at starting point
   - Take a deep breath

2. **Record**:
   - Start recording
   - Wait 2 seconds (buffer)
   - Speak clearly and at moderate pace
   - Follow the script
   - Perform demo actions smoothly
   - Wait 2 seconds at end (buffer)
   - Stop recording

3. **Review**:
   - Watch the recording
   - Check audio quality
   - Verify all actions visible
   - Re-record if needed

### Step 3: Recording Tips

**Voice Recording**:
- Speak clearly and confidently
- Maintain consistent volume
- Pause briefly between sentences
- Emphasize key points
- Smile while speaking (it affects tone!)

**Screen Actions**:
- Move cursor slowly and deliberately
- Highlight important elements
- Pause briefly on key information
- Avoid rapid scrolling
- Use smooth transitions

**Common Mistakes to Avoid**:
- ❌ Speaking too fast
- ❌ Moving cursor too quickly
- ❌ Forgetting to show important details
- ❌ Background noise
- ❌ Low audio volume
- ❌ Text too small to read
- ❌ Going over 3 minutes

---

## ✂️ Editing Process

### Video Editing Software (choose one):

**Free Options**:
- **DaVinci Resolve** (Professional, free) - https://www.blackmagicdesign.com/products/davinciresolve
- **iMovie** (Mac only, free)
- **OpenShot** (Cross-platform, free) - https://www.openshot.org/

**Paid Options**:
- **Adobe Premiere Pro** (Professional)
- **Final Cut Pro** (Mac only)
- **Camtasia** (Easy to use)

### Editing Steps

#### 1. Import Segments
- Import all recorded segments
- Organize in timeline order
- Label each segment clearly

#### 2. Trim and Cut
- Remove buffer time at start/end
- Cut out mistakes or pauses
- Ensure smooth transitions
- Keep total under 3 minutes

#### 3. Add Transitions
- Use simple cuts (no fancy effects)
- Add quick fade between major sections (0.5s)
- Keep it professional and clean

#### 4. Add Text Overlays

**Intro Screen** (0:00 - 0:05):
```
Haunted Agents Marketplace 🎃
One Skeleton, Infinite Possibilities
```

**Application Labels** (when showing each app):
```
App 1: Kiro Agents Marketplace
App 2: DevOps Automation Hub
```

**CLI Commands** (show command being typed):
```
$ kiro-agent install react-supabase-expert
```

**Closing Screen** (2:50 - 3:00):
```
GitHub: [Your GitHub URL]
Live Demos:
  • Kiro Marketplace: [URL]
  • DevOps Hub: [URL]
CLI: npm install -g @haunted-agents/cli

Built with Kiro IDE 🎃
```

#### 5. Enhance Visuals

**Cursor Highlighting**:
- Add cursor highlight effect (circle or glow)
- Makes cursor easier to follow

**Zoom Effects** (optional):
- Zoom in on important details
- Use sparingly (2-3 times max)

**Arrows/Callouts** (optional):
- Point to key features
- Use for 1-2 seconds max

#### 6. Audio Enhancement

**Audio Editing**:
- Normalize audio levels
- Remove background noise
- Add fade in/out at start/end
- Ensure consistent volume throughout

**Background Music** (optional):
- Use subtle, non-distracting music
- Keep volume low (10-20% of voice)
- Use royalty-free music only
- Fade out during important narration

**Recommended Music Sources**:
- YouTube Audio Library (free)
- Epidemic Sound (paid)
- Artlist (paid)

#### 7. Final Touches

**Color Correction**:
- Adjust brightness/contrast if needed
- Ensure consistent look throughout

**Captions** (optional but recommended):
- Add subtitles for accessibility
- Use YouTube's auto-caption feature
- Review and correct auto-generated captions

---

## 📤 Export Settings

### Video Export Settings

**Format**: MP4 (H.264)
**Resolution**: 1920x1080 (Full HD)
**Frame Rate**: 30 fps
**Bitrate**: 8-10 Mbps (high quality)
**Audio**: AAC, 192 kbps, 48 kHz

### File Size
- Target: Under 500 MB
- YouTube accepts up to 128 GB
- Higher quality is better for YouTube

### Export Checklist
- [ ] Video is under 3 minutes
- [ ] Resolution is 1920x1080
- [ ] Audio is clear and balanced
- [ ] All text is readable
- [ ] Transitions are smooth
- [ ] No errors or glitches visible
- [ ] File size is reasonable

---

## 🎯 Quality Checklist

Before uploading, verify:

### Content
- [ ] Shows both applications clearly
- [ ] Demonstrates skeleton versatility
- [ ] Shows CLI installation workflow
- [ ] Highlights configuration-driven approach
- [ ] Includes all required information
- [ ] Stays under 3 minutes

### Technical Quality
- [ ] Video is clear and sharp (1080p)
- [ ] Audio is clear and balanced
- [ ] No background noise
- [ ] Text is readable
- [ ] Cursor is visible
- [ ] Smooth transitions
- [ ] Professional appearance

### Messaging
- [ ] Emphasizes "one skeleton, multiple apps"
- [ ] Shows real functionality
- [ ] Demonstrates ease of use
- [ ] Highlights Kiro integration
- [ ] Includes call-to-action (GitHub, demos)

---

## 🚀 Quick Recording Workflow

If you're short on time, here's a streamlined approach:

### Option 1: Single Take (Risky but Fast)
1. Practice the full demo 2-3 times
2. Record entire 3-minute demo in one take
3. Do 2-3 full takes
4. Pick the best one
5. Minor edits only (trim start/end, add text overlays)

### Option 2: Segment Recording (Recommended)
1. Record each segment separately (6 segments)
2. Do 2 takes of each segment
3. Pick best take for each
4. Edit together with transitions
5. Add text overlays and polish

### Option 3: Voiceover (Most Flexible)
1. Record all screen actions first (no audio)
2. Record voiceover separately while watching video
3. Sync audio with video in editing
4. Allows for perfect narration
5. Can re-record audio without re-recording video

---

## 💡 Pro Tips

### Recording Tips
1. **Practice First**: Do a full dry run before recording
2. **Use Hotkeys**: Learn screen recording hotkeys for smooth start/stop
3. **Hide Cursor When Not Needed**: Less distracting
4. **Use Bookmarks**: Pre-bookmark pages for instant navigation
5. **Prepare Terminal Commands**: Copy-paste for accuracy

### Editing Tips
1. **Cut Aggressively**: Remove any dead time
2. **Match Audio to Action**: Sync narration with what's on screen
3. **Use J-Cuts**: Start audio before video transition (sounds professional)
4. **Keep It Simple**: Don't over-edit with effects
5. **Export Multiple Versions**: Keep a backup before final export

### Time Management
- **Recording**: 1-2 hours (including retakes)
- **Editing**: 1-2 hours (depending on experience)
- **Review**: 30 minutes (watch multiple times)
- **Total**: 3-5 hours for high-quality video

---

## 🆘 Troubleshooting

### Common Issues

**Audio Out of Sync**:
- Re-sync in editing software
- Use audio waveform to match
- Consider re-recording audio

**Video Too Long**:
- Cut unnecessary pauses
- Speed up slow sections (1.1-1.2x)
- Remove less important content
- Speak faster in re-recording

**Poor Video Quality**:
- Check recording resolution settings
- Ensure sufficient lighting
- Use higher bitrate for export
- Re-record if necessary

**Text Not Readable**:
- Increase browser zoom
- Use larger font sizes
- Add text overlays in editing
- Zoom in on important text

**Choppy Video**:
- Close other applications while recording
- Use lower recording quality if needed
- Upgrade hardware if possible
- Use screen recording optimization settings

---

## 📝 Recording Script Reference

Keep the full narration script (from DEMO_VIDEO_SCRIPT.md) open while recording:

**Quick Reference Timing**:
- Intro: 20 seconds
- App 1: 40 seconds
- App 2: 40 seconds
- CLI: 40 seconds
- Skeleton: 30 seconds
- Closing: 10 seconds
- **Total**: 180 seconds (3 minutes)

---

## ✅ Final Checklist Before Upload

- [ ] Video is under 3 minutes (check duration)
- [ ] All segments recorded and edited
- [ ] Audio is clear and balanced
- [ ] Text overlays added
- [ ] Transitions are smooth
- [ ] Closing screen includes all URLs
- [ ] Video exported in correct format
- [ ] File size is reasonable
- [ ] Watched full video 2-3 times
- [ ] No errors or glitches
- [ ] Ready for YouTube upload

---

## 🎬 You're Ready!

Once you've completed all the steps above, you'll have a professional demo video ready for upload to YouTube. The next step (task 25.3) will cover the YouTube upload process.

**Good luck with your recording!** 🎃

---

**Guide Version**: 1.0  
**Last Updated**: 2025-11-25
