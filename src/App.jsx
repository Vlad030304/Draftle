import { useState, useRef, useEffect } from 'react';

const DraftGuesser = () => {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameWon, setGameWon] = useState(false);
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const nbaPlayers = [
    "Precious Achiuwa (NYK)", "Bam Adebayo (MIA)", "Ochai Agbaji (TOR)", "Santi Aldama (MEM)",
    "Nickeil Alexander-Walker (ATL)", "Grayson Allen (PHX)", "Jarrett Allen (CLE)", "LaMelo Ball (CHA)",
    "Lonzo Ball (CHI)", "Desmond Bane (ORL)", "Paolo Banchero (ORL)", "Scottie Barnes (TOR)",
    "Harrison Barnes (SAS)", "RJ Barrett (TOR)", "Keegan Beal (SAC)", "Bradley Beal (PHX)",
    "Malik Beasley (DET)", "Davis Bertans (OKC)", "Patrick Beverley (MIA)", "Khem Birch (TOR)",
    "Anthony Black (ORL)", "Bismack Biyombo (MEM)", "Bogdan Bogdanovic (ATL)", "Bojan Bogdanovic (BKN)",
    "Bol Bol (PHX)", "Marjon Beauchamp (MIL)", "Devin Booker (PHX)", "Chris Boucher (TOR)",
    "Mikal Bridges (NYK)", "Miles Bridges (CHA)", "Malcolm Brogdon (WAS)", "Dillon Brooks (HOU)",
    "Bruce Brown (TOR)", "Jaylen Brown (BOS)", "Troy Brown Jr. (LAL)", "Jalen Brunson (NYK)",
    "Thomas Bryant (MIA)", "Kobe Bufkin (LAL)", "Reggie Bullock (HOU)", "Jared Butler (WAS)",
    "Jimmy Butler (MIA)", "Matas Buzelis (CHI)", "Kentavious Caldwell-Pope (MEM)", "Vlatko Cancar (DEN)",
    "Clint Capela (ATL)", "Bub Carrington (WAS)", "Carlton Carrington (WAS)", "Alex Caruso (OKC)",
    "Wendell Carter Jr. (ORL)", "Stephon Castle (SAS)", "Julian Champagnie (SAS)", "Max Christie (DAL)",
    "Josh Christopher (MIA)", "Brandon Clarke (MEM)", "Jordan Clarkson (UTA)", "Nic Claxton (BKN)",
    "Donovan Clingan (POR)", "Noah Clowney (BKN)", "John Collins (UTA)", "Zach Collins (SAS)",
    "Mike Conley (MIN)", "Pat Connaughton (MIL)", "Tyler Cook (IND)", "Bilal Coulibaly (WAS)",
    "Robert Covington (PHI)", "Torrey Craig (CHI)", "Jae Crowder (MIL)", "Cade Cunningham (DET)",
    "Seth Curry (CHA)", "Stephen Curry (GSW)", "Pacome Dadiet (NYK)", "Dyson Daniels (ATL)",
    "Anthony Davis (DAL)", "DeMar DeRozan (SAC)", "Ousmane Dieng (OKC)", "Rob Dillingham (MIN)",
    "Spencer Dinwiddie (DAL)", "Luka Doncic (LAL)", "Luguentz Dort (OKC)", "Ayo Dosunmu (CHI)",
    "Tristan da Silva (ORL)", "Kris Dunn (LAC)", "Kevin Durant (PHX)", "Ryan Dunn (PHX)",
    "Anthony Edwards (MIN)", "Kessler Edwards (SAC)", "Zach Edey (MEM)", "Joel Embiid (PHI)",
    "Drew Eubanks (UTA)", "Dante Exum (DAL)", "Bruno Fernando (TOR)", "Dorian Finney-Smith (LAL)",
    "Kyle Filipowski (UTA)", "Malachi Flynn (UTA)", "Taurean Prince (MIL)", "Markelle Fultz (ORL)",
    "Daniel Gafford (DAL)", "Danilo Gallinari (MIL)", "Darius Garland (CLE)", "Usman Garuba (GSW)",
    "Paul George (PHI)", "Taj Gibson (CHA)", "Shai Gilgeous-Alexander (OKC)", "Anthony Gill (WAS)",
    "Josh Giddey (CHI)", "Kyshawn George (WAS)", "Rudy Gobert (MIN)", "Jordan Goodwin (MEM)",
    "Aaron Gordon (DEN)", "Eric Gordon (PHI)", "Devonte' Graham (SAS)", "Jerami Grant (POR)",
    "AJ Green (MIL)", "Draymond Green (GSW)", "Jalen Green (HOU)", "Jeff Green (HOU)",
    "Josh Green (CHA)", "Quentin Grimes (DAL)", "Rui Hachimura (LAL)", "Tyrese Haliburton (IND)",
    "Tim Hardaway Jr. (DET)", "James Harden (LAC)", "Jaden Hardy (DAL)", "Gary Harris (ORL)",
    "Tobias Harris (DET)", "Joe Harris (DET)", "Josh Hart (NYK)", "Isaiah Hartenstein (OKC)",
    "Sam Hauser (BOS)", "Jaxson Hayes (LAL)", "Gordon Hayward (OKC)", "Scoot Henderson (POR)",
    "Taylor Hendricks (UTA)", "Tyler Herro (MIA)", "Buddy Hield (GSW)", "Haywood Highsmith (MIA)",
    "George Hill (MIL)", "Malcolm Hill (CHI)", "Aaron Holiday (HOU)", "Jrue Holiday (BOS)",
    "Ron Holland (DET)", "Richaun Holmes (WAS)", "Chet Holmgren (OKC)", "Jalen Hood-Schifino (UTA)",
    "Al Horford (BOS)", "Talen Horton-Tucker (CHI)", "Danuel House Jr. (PHI)", "Caleb Houstan (ORL)",
    "Jett Howard (ORL)", "Kevin Huerter (SAC)", "Jay Huff (MEM)", "De'Andre Hunter (ATL)",
    "Bones Hyland (LAC)", "Joe Ingles (MIN)", "Harrison Ingram (SAS)", "Brandon Ingram (NOP)",
    "Kyrie Irving (DAL)", "Jonathan Isaac (ORL)", "Isaiah Jackson (IND)", "Jaren Jackson Jr. (MEM)",
    "Quenton Jackson (IND)", "Andre Jackson Jr. (MIL)", "Bronny James (LAL)", "LeBron James (LAL)",
    "DaQuan Jeffries (CHA)", "Ty Jerome (CLE)", "Isaiah Joe (OKC)", "Cam Johnson (BKN)",
    "Jalen Johnson (ATL)", "Keldon Johnson (SAS)", "Keon Johnson (BKN)", "Nikola Jokic (DEN)",
    "Damian Jones (LAC)", "Derrick Jones Jr. (LAC)", "Herbert Jones (NOP)", "Kai Jones (LAC)",
    "Tre Jones (SAS)", "Tyus Jones (ORL)", "DeAndre Jordan (DEN)", "Cory Joseph (IND)",
    "Nikola Jovic (MIA)", "Luke Kennard (MEM)", "Walker Kessler (UTA)", "Corey Kispert (ATL)",
    "Braun Christian (DEN)", "Maxi Kleber (LAL)", "Dalton Knecht (LAL)", "John Konchar (MEM)",
    "Luke Kornet (BOS)", "Jonathan Kuminga (GSW)", "Kyle Kuzma (MIL)", "Anthony Lamb (GSW)",
    "Jake LaRavia (MEM)", "Zach LaVine (CHI)", "AJ Lawson (DAL)", "Jock Landale (MEM)",
    "Romeo Langford (UTA)", "Kawhi Leonard (LAC)", "Caris LeVert (CLE)", "Damian Lillard (MIL)",
    "Nassir Little (MIA)", "Kenneth Lofton Jr. (UTA)", "Kevon Looney (GSW)", "Brook Lopez (MIL)",
    "Robin Lopez (MIL)", "Kevin Love (MIA)", "Kyle Lowry (PHI)", "Trey Lyles (SAC)",
    "Theo Maledon (PHX)", "Sandro Mamukelashvili (SAS)", "Tre Mann (CHA)", "Terance Mann (LAC)",
    "Lauri Markkanen (UTA)", "Naji Marshall (DAL)", "Caleb Martin (PHI)", "Cody Martin (CHA)",
    "Tyrese Martin (BKN)", "Garrison Mathews (ATL)", "Wesley Matthews (ATL)", "Bennedict Mathurin (IND)",
    "Tyrese Maxey (PHI)", "Miles McBride (NYK)", "CJ McCollum (ATL)", "T.J. McConnell (IND)",
    "Jaden McDaniels (MIN)", "Jalen McDaniels (SAC)", "Doug McDermott (SAC)", "JaVale McGee (SAC)",
    "Bryce McGowens (CHA)", "Jordan McLaughlin (SAC)", "De'Anthony Melton (GSW)", "Sam Merrill (CLE)",
    "Chimezie Metu (PHX)", "Khris Middleton (MIL)", "Patty Mills (MIA)", "Shake Milton (BKN)",
    "Davion Mitchell (TOR)", "Donovan Mitchell (CLE)", "Ajay Mitchell (OKC)", "Evan Mobley (CLE)",
    "Isaiah Mobley (CLE)", "Malik Monk (SAC)", "Moses Moody (GSW)", "Wendell Moore Jr. (MIN)",
    "Ja Morant (MEM)", "Marcus Morris Sr. (CLE)", "Markieff Morris (LAL)", "Monte Morris (PHX)",
    "Trey Murphy III (NOP)", "Dejounte Murray (NOP)", "Jamal Murray (DEN)", "Larry Nance Jr. (ATL)",
    "Andrew Nembhard (IND)", "Aaron Nesmith (IND)", "Georges Niang (CLE)", "Zeke Nnaji (DEN)",
    "Naz Reid (MIN)", "Jordan Nwora (TOR)", "Royce O'Neale (PHX)", "Victor Oladipo (MIA)",
    "Kelly Olynyk (TOR)", "Cedi Osman (SAS)", "Onyeka Okongwu (ATL)", "Isaac Okoro (CLE)",
    "Kelly Oubre Jr. (PHI)", "Chris Paul (SAS)", "Cameron Payne (NYK)", "Gary Payton II (GSW)",
    "Jakob Poeltl (TOR)", "Aleksej Pokusevski (CHA)", "Jordan Poole (WAS)", "Bobby Portis (MIL)",
    "Michael Porter Jr. (DEN)", "Kevin Porter Jr. (LAC)", "Kristaps Porzingis (BOS)", "Dwight Powell (DAL)",
    "Norman Powell (LAC)", "Olivier-Maxence Prosper (DAL)", "Josh Primo (LAC)", "Payton Pritchard (BOS)",
    "Trevelin Queen (ORL)", "Immanuel Quickley (TOR)", "Julius Randle (MIN)", "Austin Reaves (LAL)",
    "Cam Reddish (LAL)", "Nick Richards (CHA)", "Josh Richardson (MIA)", "Zaccharie Risacher (ATL)",
    "Isaiah Roby (SAS)", "Duncan Robinson (MIA)", "Derrick Rose (MEM)", "Terry Rozier (MIA)",
    "Ricky Rubio (CLE)", "D'Angelo Russell (LAL)", "Domantas Sabonis (SAC)", "Tidjane Salaun (CHA)",
    "Dario Saric (DEN)", "Alexandre Sarr (WAS)", "Admiral Schofield (ORL)", "Dennis Schroder (BKN)",
    "Alperen Sengun (HOU)", "Collin Sexton (UTA)", "Landry Shamet (WAS)", "Terrence Shannon Jr. (MIN)",
    "Day'Ron Sharpe (BKN)", "Ben Sheppard (IND)", "Reed Sheppard (HOU)", "Pascal Siakam (IND)",
    "Anfernee Simons (POR)", "Ben Simmons (BKN)", "Jalen Smith (IND)", "Dennis Smith Jr. (BKN)",
    "Jabari Smith Jr. (HOU)", "Jalen Slawson (SAC)", "Marcus Smart (MEM)", "Jaden Springer (BOS)",
    "Lamar Stevens (BOS)", "Isaiah Stewart (DET)", "Max Strus (CLE)", "Jalen Suggs (ORL)",
    "Cole Swider (LAL)", "Jae'Sean Tate (HOU)", "Jayson Tatum (BOS)", "Terry Taylor (CHI)",
    "Garrett Temple (TOR)", "Daniel Theis (NOP)", "Cam Thomas (BKN)", "Obi Toppin (IND)",
    "Karl-Anthony Towns (NYK)", "Gary Trent Jr. (MIL)", "P.J. Tucker (LAC)", "Myles Turner (IND)",
    "Jaylon Tyson (CLE)", "Jonas Valanciunas (WAS)", "Fred VanVleet (HOU)", "Jarred Vanderbilt (LAL)",
    "Devin Vassell (SAS)", "Gabe Vincent (LAL)", "Nikola Vucevic (CHI)", "Dean Wade (CLE)",
    "Franz Wagner (ORL)", "Moe Wagner (ORL)", "Lonnie Walker IV (BOS)", "Jabari Walker (POR)",
    "Jarace Walker (IND)", "Ja'Kobe Walter (TOR)", "Derrick Walton Jr. (DET)", "T.J. Warren (MIN)",
    "Kel'el Ware (MIA)", "Lindy Waters III (GSW)", "Peyton Watson (DEN)", "Yuta Watanabe (MEM)",
    "Jaylin Wells (MEM)", "Victor Wembanyama (SAS)", "Russell Westbrook (DEN)", "Derrick White (BOS)",
    "Jack White (OKC)", "Coby White (CHI)", "Andrew Wiggins (GSW)", "Aaron Wiggins (OKC)",
    "Grant Williams (CHA)", "Jalen Williams (OKC)", "Jaylin Williams (OKC)", "Kenrich Williams (OKC)",
    "Mark Williams (CHA)", "Patrick Williams (CHI)", "Robert Williams III (POR)", "Ziaire Williams (BKN)",
    "Jalen Wilson (BKN)", "Cody Williams (UTA)", "Dylan Windler (LAL)", "Justise Winslow (POR)",
    "Christian Wood (LAL)", "Delon Wright (MIL)", "Thaddeus Young (PHX)", "Trae Young (WAS)",
    "Omer Yurtseven (UTA)", "Cody Zeller (NOP)", "Ivica Zubac (LAC)", "Giannis Antetokounmpo (MIL)"
  ];

  const player = {
    name: 'Alperen Sengun',
    alternateNames: ['sengun', 'alperen sengun', 'alp sengun', 'alperen sengun (hou)'],
    draftDescription: {
      pluses: [
        "He's a dancer on the low post. He has unbelievable footwork, doesn't predetermine his moves, and he can finish through tons of contact using either hand from difficult angles. He lives at the free throw line.",
        "Sets strong screens and finishes at a high level on rolls to the rim thanks to his good hands and feel. He'll use spins, fakes, and pivots to create space off the bounce. He can also finish loudly if he has space to leap.",
        "Excellent passer with the upside to be an offensive hub. He facilitates from the post, the elbows, and even brings the ball up the court.",
        "Untapped shooting potential: He shot nearly 80 percent from the line this past year and has good touch around the rim.",
        "Heat-seeking missile as an offensive rebounder.",
        "Good on-ball defensive potential if his athleticism improves in the pros. He has fluidity but needs to work on his technique.",
        "Active off-ball defender. His hustle and spirit are major positives when projecting forward as he continues to hone his fundamentals and discipline."
      ],
      minuses: [
        "He's a nonshooter right now, but he has potential if he changes his mechanics—he has inconsistent footwork and it looks like his off-hand might be affecting his shot.",
        "He's undersized as a true center so it might be a challenge for him to battle on the post against larger bigs.",
        "What is his position defensively? His slow feet and lack of verticality and length hold him back, meaning he'll need to learn to be a positional defender."
      ]
    },
    hints: [
      { label: 'Draft Year', value: '2021' },
      { label: 'Draft Position', value: '16th overall' },
      { label: 'Position', value: 'Center' },
      { label: 'Team Drafted By', value: 'OKC Thunder (traded to Houston Rockets)' },
      { label: 'Previous Team', value: 'Besiktas (Turkey)' },
      { label: 'Career Note', value: 'Known for elite playmaking as a center' }
    ]
  };

  const checkGuess = (guess) => {
    const normalized = guess.toLowerCase().trim();
    return player.alternateNames.some(n => normalized === n.toLowerCase());
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setCurrentGuess(val);
    if (val.length >= 2) {
      const filtered = nbaPlayers.filter(p =>
        p.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 8);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (name) => {
    setCurrentGuess(name);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleSubmit = () => {
    if (!currentGuess.trim() || gameWon) return;
    const isCorrect = checkGuess(currentGuess);
    setGuesses([...guesses, { text: currentGuess, correct: isCorrect }]);
    if (isCorrect) setGameWon(true);
    else if (hintsRevealed < player.hints.length) setHintsRevealed(hintsRevealed + 1);
    setCurrentGuess('');
    setShowSuggestions(false);
  };

  const handleKeyPress = (e) => { if (e.key === 'Enter') handleSubmit(); };

  const resetGame = () => {
    setGuesses([]);
    setCurrentGuess('');
    setGameWon(false);
    setHintsRevealed(0);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handler = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) setShowSuggestions(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div style={{ minHeight: '100%', height: '100%', background: '#000', color: '#fff', fontFamily: 'Arial, sans-serif', padding: '24px', margin: 0 }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 'bold', marginBottom: '6px', letterSpacing: '1px' }}>
          DRAFTLE
        </h1>
        <p style={{ textAlign: 'center', color: '#aaa', fontSize: '14px', marginBottom: '32px' }}>
          Read the scouting report and guess the player.
        </p>

        <div style={{ display: 'flex', gap: '0', marginBottom: '28px' }}>
          <div style={{ flex: 1, padding: '24px' }}>
            <h2 style={{ color: '#4ade80', fontSize: '16px', fontWeight: 'bold', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Strengths
            </h2>
            {player.draftDescription.pluses.map((p, i) => (
              <p key={i} style={{ color: '#ccc', fontSize: '13px', lineHeight: '1.6', marginBottom: '10px' }}>• {p}</p>
            ))}
          </div>
          <div style={{ width: '1px', background: '#fff', flexShrink: 0 }}></div>
          <div style={{ flex: 1, padding: '24px' }}>
            <h2 style={{ color: '#f87171', fontSize: '16px', fontWeight: 'bold', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Weaknesses
            </h2>
            {player.draftDescription.minuses.map((m, i) => (
              <p key={i} style={{ color: '#ccc', fontSize: '13px', lineHeight: '1.6', marginBottom: '10px' }}>• {m}</p>
            ))}
          </div>
        </div>

        {hintsRevealed > 0 && (
          <div style={{ border: '1px solid #444', borderRadius: '8px', padding: '18px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#60a5fa', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Hints Unlocked
            </h3>
            {player.hints.slice(0, hintsRevealed).map((h, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px', fontSize: '14px' }}>
                <span style={{ color: '#60a5fa', fontWeight: 'bold' }}>{h.label}:</span>
                <span style={{ color: '#ddd' }}>{h.value}</span>
              </div>
            ))}
          </div>
        )}

        {guesses.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#aaa' }}>
              Your Guesses
            </h3>
            {guesses.map((g, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
                borderRadius: '6px', marginBottom: '6px',
                border: g.correct ? '1px solid #4ade80' : '1px solid #f87171',
                background: g.correct ? 'rgba(74,222,128,0.08)' : 'rgba(248,113,113,0.08)'
              }}>
                <span style={{ color: g.correct ? '#4ade80' : '#f87171', fontSize: '18px' }}>{g.correct ? '✓' : '✗'}</span>
                <span style={{ fontSize: '14px', color: '#fff' }}>{g.text}</span>
              </div>
            ))}
          </div>
        )}

        {!gameWon ? (
          <div ref={inputRef} style={{ position: 'relative' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                value={currentGuess}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type a player name..."
                style={{
                  flex: 1, padding: '12px 16px', background: '#000', color: '#fff',
                  border: '1px solid #fff', borderRadius: '6px', fontSize: '14px',
                  outline: 'none', caretColor: '#fff'
                }}
              />
              <button
                onClick={handleSubmit}
                style={{
                  padding: '12px 24px', background: '#fff', color: '#000',
                  border: 'none', borderRadius: '6px', fontWeight: 'bold',
                  fontSize: '14px', cursor: 'pointer'
                }}
              >
                GUESS
              </button>
            </div>
            {showSuggestions && (
              <div style={{
                position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '4px',
                background: '#111', border: '1px solid #fff', borderRadius: '6px',
                maxHeight: '220px', overflowY: 'auto', zIndex: 10
              }}>
                {suggestions.map((name, i) => (
                  <div
                    key={i}
                    onClick={() => handleSuggestionClick(name)}
                    style={{
                      padding: '10px 16px', cursor: 'pointer', fontSize: '14px',
                      color: '#fff', borderBottom: i < suggestions.length - 1 ? '1px solid #222' : 'none'
                    }}
                    onMouseEnter={e => e.target.style.background = '#222'}
                    onMouseLeave={e => e.target.style.background = 'transparent'}
                  >
                    {name}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ border: '1px solid #4ade80', borderRadius: '8px', padding: '32px', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#4ade80', marginBottom: '8px' }}>🎉 Correct!</h2>
              <p style={{ fontSize: '16px', color: '#ddd', marginBottom: '6px' }}>
                The player was <span style={{ fontWeight: 'bold', color: '#fff' }}>{player.name}</span>
              </p>
              <p style={{ fontSize: '14px', color: '#aaa' }}>
                You got it in {guesses.length} {guesses.length === 1 ? 'guess' : 'guesses'}
              </p>
            </div>
            <button
              onClick={resetGame}
              style={{
                padding: '12px 28px', background: '#fff', color: '#000',
                border: 'none', borderRadius: '6px', fontWeight: 'bold',
                fontSize: '14px', cursor: 'pointer'
              }}
            >
              PLAY AGAIN
            </button>
          </div>
        )}

        <p style={{ textAlign: 'center', color: '#555', fontSize: '12px', marginTop: '36px' }}>
          Hints unlock after each wrong guess. Try to guess with as few hints as possible.
        </p>
      </div>
    </div>
  );
};

export default DraftGuesser;