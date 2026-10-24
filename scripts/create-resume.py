"""Generate a one-page PDF using only Sandul's confirmed information.

No third-party Python dependencies are required.
"""
from pathlib import Path
from textwrap import wrap

PAGE_W, PAGE_H = 595, 842
ops = []
links = []

def text(value, x, y, size=10, bold=False, color=(.19,.23,.30)):
    escaped = value.replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')
    ops.append(f"BT /{'F2' if bold else 'F1'} {size} Tf {' '.join(map(str,color))} rg 1 0 0 1 {x} {y} Tm ({escaped}) Tj ET")

def line(x1,y1,x2,y2,color=(.85,.88,.93)):
    ops.append(f"{' '.join(map(str,color))} RG 0.6 w {x1} {y1} m {x2} {y2} l S")

def paragraph(value,y,width=97,size=9.2,leading=14):
    for row in wrap(value,width):
        text(row,44,y,size)
        y-=leading
    return y

def section(title,y):
    text(title.upper(),44,y,9,True,(.30,.29,.60))
    line(44,y-8,551,y-8)
    return y-29

ops.append('0.055 0.071 0.12 rg 0 696 595 146 re f')
text('SANDUL HANSANA',44,791,25,True,(.96,.97,1))
text('Software Engineering Undergraduate | Aspiring Full-Stack Developer',44,766,10,False,(.72,.73,.91))
text('Sri Lanka  |  sandulhansana@gmail.com',44,741,9,False,(.82,.85,.93))
text('GitHub: github.com/Sandul17',44,719,8.5,False,(.75,.78,.92))
text('LinkedIn: sandul-hansana-vas-gunawardana-b30279255',240,719,8,False,(.75,.78,.92))
links += [((44,736,290,750),'mailto:sandulhansana@gmail.com'),((44,714,224,728),'https://github.com/Sandul17'),((240,714,551,728),'https://www.linkedin.com/in/sandul-hansana-vas-gunawardana-b30279255/')]
y=section('Profile',669)
y=paragraph('Fourth-year Software Engineering undergraduate at Informatics Institute of Technology (IIT), passionate about software development, web technologies, and solving real-world problems. Enjoys building user-friendly applications, exploring new technologies, and improving technical and problem-solving skills.',y)
y=section('Education',y-19)
text('BEng (Hons) Software Engineering',44,y,11,True);y-=17
text('Informatics Institute of Technology (IIT), Sri Lanka',44,y,9.5);y-=16
text('Fourth-Year Undergraduate',44,y,9);y-=31
y=section('Technical skills',y)
for label,value in [('Frontend','HTML, CSS, JavaScript, React'),('Backend & languages','Java, Python, JavaScript'),('Tools','Git, GitHub, Visual Studio Code, IntelliJ IDEA'),('Foundations','Object-Oriented Programming, Software Engineering, Problem Solving')]:
    text(label,44,y,9,True);text(value,157,y,8.8);y-=18
y=section('Projects',y-15)
text('PlotGuard - Final Year Research Project',44,y,10.5,True);y-=17
y=paragraph('Research-based software solution applying modern technologies to a real-world problem through an intelligent and user-friendly system, developed as part of the final-year degree.',y,width=103,size=9)
y-=15
text('Interactive Ticket Booking System',44,y,10.5,True);y-=17
y=paragraph('Console-based application to purchase seats, cancel reservations, search tickets, display seating arrangements, and calculate total ticket sales.',y,width=103,size=9)
y-=15
text('Personal Portfolio Website',44,y,10.5,True);y-=17
y=paragraph('Responsive portfolio showcasing technical skills, academic projects, educational background, and professional development. Built with React, Tailwind CSS, and JavaScript.',y,width=103,size=9)
line(44,51,551,51)
text('SANDUL HANSANA',44,34,7,True,(.45,.49,.57))
text('SOFTWARE ENGINEERING PORTFOLIO',352,34,7,False,(.45,.49,.57))
assert y>65, f'Resume content overlaps the footer: {y}'
content='\n'.join(ops).encode('cp1252')
objects=[]
def obj(value):
    objects.append(value.encode('cp1252') if isinstance(value,str) else value)
    return len(objects)
obj('<< /Type /Catalog /Pages 2 0 R >>')
obj('<< /Type /Pages /Kids [3 0 R] /Count 1 >>')
annotations=' '.join(f'{7+i} 0 R' for i in range(len(links)))
obj(f'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {PAGE_W} {PAGE_H}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R /Annots [{annotations}] >>')
obj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>')
obj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>')
obj(f'<< /Length {len(content)} >>\nstream\n'.encode()+content+b'\nendstream')
for rect,url in links:
    obj('<< /Type /Annot /Subtype /Link /Rect ['+' '.join(map(str,rect))+'] /Border [0 0 0] /A << /S /URI /URI ('+url+') >> >>')
pdf=bytearray(b'%PDF-1.4\n%\xe2\xe3\xcf\xd3\n');offsets=[0]
for i,data in enumerate(objects,1):
    offsets.append(len(pdf));pdf+=f'{i} 0 obj\n'.encode()+data+b'\nendobj\n'
xref=len(pdf);pdf+=f'xref\n0 {len(objects)+1}\n0000000000 65535 f \n'.encode()
for offset in offsets[1:]:pdf+=f'{offset:010d} 00000 n \n'.encode()
pdf+=f'trailer\n<< /Size {len(objects)+1} /Root 1 0 R >>\nstartxref\n{xref}\n%%EOF\n'.encode()
out=Path(__file__).resolve().parents[1]/'public/assets/sandul-hansana-cv.pdf'
out.parent.mkdir(parents=True,exist_ok=True);out.write_bytes(pdf)
print(f'Created {out.name}: {len(pdf)} bytes, one page, three clickable contact links.')
