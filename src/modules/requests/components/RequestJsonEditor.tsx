import * as React from "react";
import { withTheme } from "styled-components";
import AceEditor from "react-ace";
import { ITheme } from "edikit";
import {Container, Content} from "./Request_styled";

interface IRequestJsonEditorProps {
  request: any;
  isLoading: boolean;
  theme: ITheme;
}

class RequestJsonEditor extends React.Component<IRequestJsonEditorProps> {
  render() {
    const {
      request,
      isLoading,
      theme
    } = this.props;

    const source = JSON.stringify(request, null, "    ");
    return (
      <Container>
        <Content isLoading={isLoading}>
          <AceEditor
            mode="json"
            theme={theme.editor.theme}
            value={source}
            readOnly={true}
            name="editor"
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={true}
            editorProps={{
              $blockScrolling: Infinity
            }}
            fontSize={12}
            wrapEnabled={false}
            width="100%"
            height="100%"
            setOptions={{
              showLineNumbers: true,
              tabSize: 4
            }}
          />
        </Content>
      </Container>
    );
  }
}

export default withTheme(RequestJsonEditor);
