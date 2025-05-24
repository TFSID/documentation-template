# macro.py

import os
import sys
# import utils.vegalite_data

def load_component(file_path):
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    else:
        raise FileNotFoundError(f"File not found: {file_path}")



def define_env(env):
    def load_component_inside_docs_dir(file_path):
        """
        Loads the content of a markdown file into a variable.

        Args:
            file_path (str): Path to the markdown file relative to the docs directory.

        Returns:
            str: Content of the markdown file.
        """
        docs_dir = env.conf['docs_dir']  # Base directory for the MkDocs docs
        full_path = os.path.join(docs_dir, file_path)

        if os.path.exists(full_path):
            with open(full_path, 'r', encoding='utf-8') as f:
                return f.read()
        else:
            raise FileNotFoundError(f"File not found: {file_path}")
    # Create a variable

    # env.globals.update(my_variable="Hello, World!")
    # Create a function (reusable content)
    # env.globals.update(my_function=lambda: "This is a reusable function.")
    # env.globals['medium_severity'] = '<a style="color: orange;">**Medium**</a>'
    # env.variables['vapt_scripts_01'] = load_component("docs/source-code/vapt-script-01.md")
    # env.variables['va_findings_table'] = load_component("docs/assets/components/tables/va_findings.html")
    # env.variables['va_findings_summary_table'] = load_component("docs/assets/components/tables/va_findings_summary.md")
    